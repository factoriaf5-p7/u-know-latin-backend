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
      //relación entre id usario y id contenido
      { _id: user._id },
      { $push: { id_published_content: createdContentId } }, //push para poder hacerlo
      //cada vez que se actualicen los contenidos
    );
    user.save();
    return createdContent;
  }

  //relación contenido y comprado

  async buyContent(id: string) {
    const content = await this.contentModel.findById(id);

    if (!content) {
      throw new HttpException('Content not Found', HttpStatus.NOT_FOUND);
    }
    // Actualizar el estado del contenido a comprado
    content.sales = true;

    // Guardar los cambios en el contenido
    await content.save();

    return content;
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
}
