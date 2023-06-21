import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  @ApiProperty({ example: 'sebas riggio' })
  @Prop({ required: true })
  'name': string;
  @ApiProperty({ example: 'sebas15' })
  @Prop()
  'user_name': string;
  @ApiProperty({ example: 'sebapassword1234' })
  @Prop({ required: true, select: false })
  'password': string;
  @ApiProperty({ example: 'sebas@mail.com' })
  @Prop({ required: true })
  'email': string;
  @ApiProperty({ example: '1000' })
  @Prop()
  'wallet_balance': number;
  @ApiProperty({ example: 'Hola queria hacer una consulta...' })
  @Prop()
  'chat': string;
  @ApiProperty({ example: '[2,3,7]' })
  @Prop()
  'id_published_content': number[];
  @ApiProperty({ example: '[2,4,8]' })
  @Prop()
  'id_bought_content': number[];
  @ApiProperty({ example: '26/09/2023' })
  @Prop()
  'created_at:': Date;
  @ApiProperty({ example: '26/08/2023' })
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
