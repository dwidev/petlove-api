import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsNotEmpty, IsObject } from 'class-validator';
import { AccountDto } from 'src/auth/dto/account.dto';

export class UserDto {
  uuid: string;

  @IsDefined()
  @IsNotEmpty()
  full_name: string;

  @IsDefined()
  @IsNotEmpty()
  photo_profile: string;

  @IsDefined()
  @IsNotEmpty()
  pet_interets: string;

  @IsObject()
  account: AccountDto;
}

export class UpdateUserDto extends PartialType(UserDto) {}

export class CreateUserDto extends OmitType(UserDto, ['uuid']) {}
