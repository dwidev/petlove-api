import { OmitType } from '@nestjs/mapped-types';
import {
  IsDefined,
  IsEmail,
  IsInt,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { IsUnique } from 'src/utils/validator/unique-data.validator';
import { User } from '../entities/user.entity';

export class UserDto {
  id: number;

  uuid: string;

  @IsDefined()
  @MaxLength(15)
  @IsNotEmpty()
  @IsUnique([User, 'username'])
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @IsUnique([User, 'email'])
  email: string;

  @IsDefined()
  @IsNotEmpty()
  password: string;

  refresh_token: string;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {}
