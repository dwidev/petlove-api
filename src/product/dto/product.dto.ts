import {
  IsDecimal,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ProductDto {
  uuid: string;

  product_code: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  pet_category_code: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  merchant_uuid: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  product_name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  image: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
