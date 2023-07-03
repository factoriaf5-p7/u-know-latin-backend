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

  @Prop({ default: false, required: false })
  'sales': boolean;

  @Prop()
  'content': string;

  @Prop({ type: [Number], default: [] })
  ratings: number[];

  @Prop([CommentSchema])
  comments: Comment[];

  @Prop({
    type: Number,
    validate: {
      validator: (value: number) => !isNaN(value),
      message: 'Invalid average rating value',
    },
  })
  'averageRating': number;
}
export const ContentSchema = SchemaFactory.createForClass(Content);
