import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { CommentSchema } from './comment.schema';

export type ContentDocument = HydratedDocument<Content>;

@Schema()
export class Content extends Document {
  @Prop({ required: true })
  'title': string;

  @Prop()
  'author_id': string;

  @Prop()
  'description': string;

  @Prop({ required: true })
  'price': number;

  @Prop()
  'created_at': Date;

  @Prop()
  'update': Date;

  @Prop()
  'category': string;

  @Prop()
  'dificulty': number;

  @Prop()
  'sales': boolean;

  @Prop()
  'content': string;

  @Prop([CommentSchema])
  comments: Comment[];
}
export const ContentSchema = SchemaFactory.createForClass(Content);
