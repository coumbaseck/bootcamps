import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateBootcampDto {
  @IsString()
  title: string;

  @IsString()
  duration: string;

  @IsNumber()
  price: number;

  @IsDateString()
  nextSession: string;
}
