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

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post(':userId')
  createContent(
    @Param('userId') userId,
    @Body() contentDto: CreateContentDto,
  ): Promise<Content> {
    return this.contentService.createContent(contentDto, userId);
  }
  // permitir que los usuarios registrados compren contenido
  @Post(':id/buy')
  buyContent(@Param('id') id: string) {
    console.log(id, '--------vendido!!-------');
    return this.contentService.buyContent(id);
  }
  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(id, updateContentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.contentService.delete(id);
  }
}
