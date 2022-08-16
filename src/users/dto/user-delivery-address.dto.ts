import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { Account } from 'src/auth/entities/account.entity';
import { UserDto } from './user.dto';

export class UserDeliveryAddressDto {
  uuid: string;

  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  phone_number: string;

  @IsDefined()
  @IsNotEmpty()
  street_name: string;

  @IsOptional()
  detail_other: string;

  @IsDefined()
  @IsNotEmpty()
  province: string;

  @IsDefined()
  @IsNotEmpty()
  district: string;

  @IsDefined()
  @IsNotEmpty()
  village: string;

  @IsDefined()
  @IsNotEmpty()
  rt: string;

  @IsDefined()
  @IsNotEmpty()
  rw: string;

  @IsDefined()
  @IsNotEmpty()
  postal_code: string;

  @IsOptional()
  address_type: number;

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
