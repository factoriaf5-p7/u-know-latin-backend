import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentDto } from '../content/dto/create-content.dto';
import { Content } from '../schemas/content.schema';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  createContent(@Body() contentDto: ContentDto): Promise<Content> {
    return this.contentService.createContent(contentDto);
  }

  @Delete(':id')
  deleteContent(@Param('id') id: string): Promise<Content> {
    return this.contentService.deleteContent(id);
  }

  @Get()
  getAllContent(): Promise<Content[]> {
    return this.contentService.getAllContent();
  }
}
