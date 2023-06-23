import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ContentSchema } from '../schemas/content.schema';
import { UserModule } from '../user/user.module';
import { UserSchema } from '../schemas/users.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: 'Content',
        schema: ContentSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
