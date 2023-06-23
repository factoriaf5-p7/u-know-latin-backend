import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  'name': string;
  @Prop()
  'user_name': string;
  @Prop({ required: true, select: false })
  'password': string;
  @Prop({ required: true })
  'email': string;
  @Prop()
  'wallet_balance': number;
  @Prop()
  'chat': string;
  @Prop()
  'id_published_content': number[];
  @Prop()
  'id_bought_content': number[];
  @Prop()
  'created_at:': Date;
  @Prop()
  'created_update': Date;
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
