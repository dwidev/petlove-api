import { PickType } from '@nestjs/mapped-types';
import { IsDefined, IsNotEmpty } from 'class-validator';
import { CheckExistData } from 'src/utils/validator/exist-data.validator';
import { IsUnique } from 'src/utils/validator/unique-data.validator';
import { PetCategory } from '../entities/pet-category.entity';

export class PetCategoryDto {
  id: number;

  @IsDefined()
  @CheckExistData([{ entity: PetCategory, property: 'uuid' }])
  uuid: string;

  @IsDefined()
  @IsNotEmpty()
  @IsUnique([PetCategory, 'category_name'])
  category_name: string;
}

export class PetCategoryUUIDDto extends PickType(PetCategoryDto, ['uuid']) {}
