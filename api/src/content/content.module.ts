import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ContentSchema } from '../schemas/content.schema';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Content', schema: ContentSchema }]),
  ],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {
  // constructor() {
  //   const options = new DocumentBuilder()
  //     .setTitle('Content API')
  //     .setDescription('API for managing content')
  //     .setVersion('1.0')
  //     .build();
  //   const document = SwaggerModule.createDocument(this.app, options);
  //   SwaggerModule.setup('api', this.app, document);
  // }
}
