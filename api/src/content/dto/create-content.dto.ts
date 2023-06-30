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
  title: string;

  @IsString()
  author_id: string;

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
