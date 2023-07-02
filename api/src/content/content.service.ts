import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from '../schemas/content.schema';
import { User } from '../schemas/users.schema';

import { CreateContentDto } from '../content/dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  create(newContent: { id: string; title: string; description: string; price: number; created_at: Date; update: Date; category: string; dificulty: number; sales: boolean; content: string; }): any {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Content.name) private readonly contentModel: Model<Content>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createContent(
    createContentDto: CreateContentDto,
    _id: string,
  ): Promise<Content> {
    const createdContent = await this.contentModel.create(createContentDto); //creamos contenido
    const user = await this.userModel.findById({ _id }); //buscamos autor del contenido
    const createdContentId = createdContent._id; //extraemos el id del contenido
    await this.userModel.updateOne(
      //relación entre id usario y id contenido
      { _id: user._id },
      { $push: { id_published_content: createdContentId } }, //push para poder hacerlo
      //cada vez que se actualicen los contenidos
    );
    user.save();
    return createdContent;
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

    if (user.id_bought_content.includes(parseInt(contentId))) {
      throw new HttpException('Content already purchased', HttpStatus.CONFLICT);
    }

    user.id_bought_content.push(parseInt(contentId));
    await user.save();

    content.sales = true;
    await content.save();

    return content;
  }

  async getBoughtContent(id: string) {
    const user = await this.userModel.findById(id); //Buscar usuario por id
    if (!user) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    } // Si el usuario no existe: "Usuario no encontrado"

    const boughtContent = await this.contentModel.find({
      _id: { $in: user.id_bought_content },
    }); // Buscar los contenidos comprados por el usuario

    const contentId = boughtContent.map((content) => content._id); // Extraer el id de los contenidos comprados

    const userBoughtContent = user.id_bought_content || []; // Si el usuario no tiene contenidos comprados, devolver un array vacío

    userBoughtContent.push(...contentId); // Agregar los ids de contenidos comprados al array userBoughtContent

    // Devolver la lista de contenidos comprados
    return boughtContent;
  }
}
