import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsDefined, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';
import { UserDto } from './create-user.dto';

export class UserDeliveryAddressDto {
  id: number;

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
  ['id'],
) {}

export class UpdateUserDeliveryAddressDto extends PartialType(
  UserDeliveryAddressDto,
) {}