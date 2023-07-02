import { IsNumber, Min, Max } from 'class-validator';

export class RateContentDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
