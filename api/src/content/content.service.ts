import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from '../schemas/content.schema';
import { User } from '../schemas/users.schema';

import { CreateContentDto } from '../content/dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel('Content') private readonly contentModel: Model<Content>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createContent(
    createContentDto: CreateContentDto,
    _id: string,
  ): Promise<Content> {
    const createdContent = await this.contentModel.create(createContentDto); //creamos contenido
    const user = await this.userModel.findById({ _id }); //buscamos autor del contenido
    console.log(user, 'service');
    const createdContentId = createdContent._id; //extraemos el id del contenido
    await this.userModel.updateOne(
      { _id: user._id },
      { $push: { id_published_content: createdContentId } },
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

  async remove(id: string) {
    const deletedContent = await this.contentModel
      .findByIdAndRemove({ _id: id })
      .exec();
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
    user.id_bought_content.push(parseInt(contentId)); // Agregar el id content comprado al array. parse pa´ convertir contentId a número
    await user.save(); // Guardar los cambios en el user

    content.sales = true; // Actualizar el estado del contenido a comprado
    await content.save(); // Guardar los cambios en el contenido

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
