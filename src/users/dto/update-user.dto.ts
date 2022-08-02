import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, UserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(UserDto) {}
