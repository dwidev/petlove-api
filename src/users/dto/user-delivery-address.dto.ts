import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';

export class UserDeliveryAddressDto {
  uuid: string;

  @IsDefined()
  @IsNotEmpty()
  address_name: string;

  @IsOptional()
  selected: boolean;

  @IsObject()
  user: User;
}

export class CreateUserDeliveryAddressDto extends OmitType(
  UserDeliveryAddressDto,
  ['uuid'],
) {}

export class UpdateUserDeliveryAddressDto extends PartialType(
  UserDeliveryAddressDto,
) {}
