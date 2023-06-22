import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type ContentDocument = HydratedDocument<Content>;

@Schema()
export class Content extends Document {
  @Prop({ required: true })
  'title': string;

  @Prop()
  'description': string;

  @Prop({ required: true })
  'price': number;

  @Prop()
  'create_at': Date;

  @Prop()
  'update': Date;

  @Prop()
  'category': string;

  @Prop()
  'dificulty': number;

  @Prop()
  'sales': boolean;

  @Prop()
  'created_at:': Date;

  @Prop()
  'content': string;
}
export const ContentSchema = SchemaFactory.createForClass(Content);
