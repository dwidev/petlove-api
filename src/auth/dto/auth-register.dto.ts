import { PickType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, isNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class AuthRegisterDto extends PickType(CreateUserDto, [
  'username',
  'email',
  'password',
]) {}
