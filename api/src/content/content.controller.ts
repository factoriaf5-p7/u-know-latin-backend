import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from '../content/dto/create-content.dto';
import { Content } from '../schemas/content.schema';
import { UpdateContentDto } from './dto/update-content.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from 'src/dto/create-comment.dto';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}
  //permitir que los usuarios registrados creen contenido
  @Post(':userId')
  createContent(
    @Param('userId') userId,
    @Body() contentDto: CreateContentDto,
  ): Promise<Content> {
    return this.contentService.createContent(contentDto, userId);
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }
  //permitir que los usuarios registrados vean contenido por id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }
  //permitir que los usuarios registrados actualicen contenido
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(id, updateContentDto);
  }
  //permitir que los usuarios registrados eliminen contenido
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.contentService.delete(id);
  }

  //permitir que los usuarios registrados compren contenido
  @Post(':id/buy/:contentId')
  buyContent(@Param('id') id: string, @Param('contentId') contentId: string) {
    console.log(id, '--------vendido!!-------');
    return this.contentService.buyContent(id, contentId);
  }
  //permitir que los usuarios registrados vean el contenido que han comprado
  @Get(':id/boughtContent')
  getBoughtContent(@Param('id') id: string) {
    return this.contentService.getBoughtContent(id);
  }
  @Post(':id/comment') 
  async addComment(
    @Param('id') id: string, 
    @Body() comment: CreateCommentDto, 
  ) {
    return this.contentService.addComment(id, comment); 
  }

}
