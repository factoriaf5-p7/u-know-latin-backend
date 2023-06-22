import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from '../schemas/content.schema';
import { ContentDto } from '../content/dto/create-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel('Content') private readonly contentModel: Model<Content>,
  ) {}

  async createContent(contentDto: ContentDto): Promise<Content> {
    const createdContent = new this.contentModel(contentDto);
    return createdContent.save();
  }

  async deleteContent(id: string): Promise<Content> {
    return this.contentModel.findByIdAndRemove(id);
  }

  async getAllContent(): Promise<Content[]> {
    return this.contentModel.find().exec();
  }
}
