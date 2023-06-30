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
    @InjectModel(Content.name) private readonly contentModel: Model<Content>,
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

    if (user.id_bought_content.includes(parseInt(contentId))) {
      throw new HttpException('Content already purchased', HttpStatus.CONFLICT);
    }

    user.id_bought_content.push(parseInt(contentId));
    await user.save();

    content.sales = true;
    await content.save();

    return content;
  }

  async getBoughtContent(id: string): Promise<Content[]> {
    // Buscar el usuario por su ID y verificar si el usuario existe
    const user: User = await this.userModel.findById({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // Buscar los contenidos comprados utilizando los identificadores
    const boughtContent: Content[] = await this.contentModel.find({
      _id: { $in: user.id_bought_content },
    });
    return boughtContent;
  }
  /* async addComment(id: string, comment: any) { 
    let book: CommentDocument = await this.commentModel.findById(id); 
    book.comments.push(comment); 
    book.save(); 
    return book; */
}
