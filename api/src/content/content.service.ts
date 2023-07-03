import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content, ContentDocument } from '../schemas/content.schema';
import { User } from '../schemas/users.schema';
import { CreateContentDto } from '../content/dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { RateContentDto } from './dto/rateContent.dto';
import { validate } from 'class-validator';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name) private readonly contentModel: Model<Content>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createContent(
    createContentDto: CreateContentDto,
    _id: string,
  ): Promise<Content> {
    const createdContent = await this.contentModel.create({
      ...createContentDto,
      price: 10, // Precio inicial
      author_id: _id,
    }); //creamos contenido
    const user = await this.userModel.findById({ _id }); //buscamos autor del contenido
    console.log(user, 'service');
    const createdContentId = createdContent._id; //extraemos el id del contenido
    await this.userModel.updateOne(
      //relación entre id usario y id contenido
      { _id: user._id },
      {
        $push: { id_published_content: { createdContentId } },
      },
    );
    await createdContent.save();
    await user.save();
    return createdContent;
  }

  async findUserContent(userId: string): Promise<Content[]> {
    return this.contentModel.find({ author_id: userId }).exec();
  }

  async findAll(): Promise<Content[]> {
    return this.contentModel.find().exec();
  }
  async findOne(id: string): Promise<Content> {
    return this.contentModel.findOne({ _id: id }).exec();
  }
  async update(id: string, updateContentDto: UpdateContentDto) {
    const content = await this.contentModel.findById(id);
    if (!content) {
      throw new HttpException('Content not Found', HttpStatus.BAD_REQUEST);
    }
    Object.assign(content, updateContentDto);

    const updateContent = await content.save();
    return updateContent;
  }

  async delete(id: string) {
    const content = await this.contentModel.findById(id).exec(); // Buscar el contenido por su ID
    if (!content) {
      throw new HttpException('Content not Found', HttpStatus.BAD_REQUEST);
    }

    // Verificar si el contenido ha sido comprado por algún usuario
    const isContentPurchased = await this.contentModel.exists({
      id_bought_content: id,
    });
    if (content.sales) {
      throw new HttpException(
        'Content cannot be deleted as it has been purchased',
        HttpStatus.FORBIDDEN,
      );
    }

    // Verificar si el usuario que realiza la solicitud es el propietario del contenido
    // if (content._id !== userId) {
    //   throw new HttpException(
    //     'You do not have permission to delete this content',
    //     HttpStatus.FORBIDDEN,
    //   );
    // }

    const deletedContent = await this.contentModel
      .findByIdAndRemove({ _id: id })
      .exec(); // Eliminar el contenido por su ID
    if (!deletedContent) {
      throw new HttpException('Content not Found', HttpStatus.BAD_REQUEST);
    }

    return deletedContent;
  }

  async buyContent(id: string, contentId: string) {
    const content = await this.contentModel.findById(contentId);
    if (!content) {
      throw new HttpException('Content not Found', HttpStatus.NOT_FOUND);
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }

    if (user.id_bought_content.includes(contentId)) {
      throw new HttpException('Content already purchased', HttpStatus.CONFLICT);
    }

    user.id_bought_content.push(contentId);

    await user.save();

    content.sales = true;
    await content.save();

    return content;
  }

  async getBoughtContent(id: string): Promise<Content[]> {
    // Buscar el usuario por su ID y verificar si el usuario existe
    const user: User = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // Buscar los contenidos comprados utilizando los identificadores
    const boughtContent: Content[] = await this.contentModel.find({
      _id: { $in: user.id_bought_content },
    });
    return boughtContent;
  }

  async addComment(_id: string, comment: any) {
    const contentComment: ContentDocument = await this.contentModel.findById(
      _id,
    );
    contentComment.comments.push(comment);
    contentComment.save();
    return contentComment;
  }

  async rateContent(
    id: string,
    rateContentDto: RateContentDto,
  ): Promise<ContentDocument> {
    const content = await this.contentModel.findById(id);

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    if (!rateContentDto.rating || isNaN(Number(rateContentDto.rating))) {
      throw new HttpException('Invalid rating value', HttpStatus.BAD_REQUEST);
    }

    const newRating = Number(rateContentDto.rating); //se convierte ese valor a numero
    const totalRatings = content.ratings?.length ?? 0; //si no hay valoraciones, se le asigna 0
    const updatedRatings: number[] = [...content.ratings, newRating];
    let newAverageRating: number;

    if (totalRatings < 4) {
      if (newRating >= 4.8) {
        newAverageRating =
          (content.averageRating * (totalRatings >= 4 ? 4 : totalRatings) +
            newRating) /
          (totalRatings + 1);
      } else {
        newAverageRating = content.averageRating;
      }
    } else {
      newAverageRating =
        (content.averageRating * (totalRatings - 4) + newRating) /
        (totalRatings - 3);
    }

    content.ratings = updatedRatings;
    content.averageRating = isNaN(newAverageRating)
      ? newRating
      : newAverageRating;

    if (content.averageRating <= 3) {
      // Verificar si la media de valoración es menor o igual a 3
      content.price = content.price * 0.9; // Reducir el precio en un 10%
    }
    await content.save();

    return content;
  }
}
// las primeras cuatro valoraciones solo se agregarán a la lista de valoraciones si su valor es mayor o igual a 4.8. Después de la cuarta valoración, todas las valoraciones se tendrán en cuenta para calcular la nueva media. es asi la consigna????
