import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class CreateContentDto {
  @IsNotEmpty()
  @IsString()
  Id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  // @IsDate()
  created_at: Date;

  @IsNotEmpty()
  // @IsDate()
  update: Date;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  dificulty: number;

  @IsNotEmpty()
  @IsBoolean()
  sales: boolean;

  @IsString()
  @IsNotEmpty()
  content: string;
}
