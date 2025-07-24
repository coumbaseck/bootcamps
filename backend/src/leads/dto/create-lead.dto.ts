import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class CreateLeadDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('SN') // Utilise le code ISO pour le Sénégal, ou remplace par 'ZZ' pour ignorer la région
  phone: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  bootcampId: number;
}
