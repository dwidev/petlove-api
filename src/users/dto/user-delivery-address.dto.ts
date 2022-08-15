import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { Account } from 'src/auth/entities/account.entity';
import { UserDto } from './user.dto';

export class UserDeliveryAddressDto {
  uuid: string;

  @IsDefined()
  @IsNotEmpty()
  address_name: string;

  @IsOptional()
  selected: boolean;

  @IsObject()
  user: UserDto;
}

export class CreateUserDeliveryAddressDto extends OmitType(
  UserDeliveryAddressDto,
  ['uuid'],
) {}

export class UpdateUserDeliveryAddressDto extends PartialType(
  UserDeliveryAddressDto,
) {}
