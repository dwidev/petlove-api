import { PickType } from '@nestjs/mapped-types';
import { IsDefined, IsNotEmpty } from 'class-validator';
import { CheckExistData } from 'src/utils/validator/exist-data.validator';
import { IsUnique } from 'src/utils/validator/unique-data.validator';
import { PetCategory } from '../entities/pet-category.entity';

export class PetCategoryDto {
  @IsDefined()
  @IsNotEmpty()
  @CheckExistData([{ entity: PetCategory, property: 'code' }])
  code: string;

  @IsDefined()
  @IsNotEmpty()
  @IsUnique([PetCategory, 'category_name'])
  category_name: string;
}

export class PetCategoryCodeDto extends PickType(PetCategoryDto, ['code']) {}
