import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type ContentDocument = HydratedDocument<Content>;

@Schema()
export class Content extends Document {
  toMatchObject(arg0: { id: any; }) {
    throw new Error('Method not implemented.');
  }
  @Prop({ required: true })
  'title': string;

  @Prop({ required: true, unique: true })
  'author': string;

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
}
export const ContentSchema = SchemaFactory.createForClass(Content);
