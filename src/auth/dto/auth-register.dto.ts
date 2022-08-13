import { PickType } from '@nestjs/mapped-types';
import { IsDefined, IsEmail, IsNotEmpty, isNotEmpty } from 'class-validator';

export class AuthRegisterDto {
  uuid: string;

  @IsDefined()
  @IsNotEmpty()
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  password: string;
}
