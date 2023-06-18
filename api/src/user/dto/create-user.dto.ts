import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsArray
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  wallet_balance: number;

  @IsString()
  chat: string;

  @IsNotEmpty()
  @IsArray()
  id_published_content: number[];

  @IsNotEmpty()
  @IsArray()
  id_bought_content: number[];

  @IsNotEmpty()
  @IsDate()
  created_at: Date;

  @IsNotEmpty()
  @IsDate()
  created_update: Date;
}
