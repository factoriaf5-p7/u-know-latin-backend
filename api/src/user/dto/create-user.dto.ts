import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  wallet_balance: number;

  @ApiProperty()
  @IsString()
  chat: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  id_published_content: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  id_bought_content: number[];

  @ApiProperty()
  @IsNotEmpty()
  /*@IsDate()*/
  created_at: Date;

  @ApiProperty()
  @IsNotEmpty()
  /*@IsDate()*/
  created_update: Date;
}
