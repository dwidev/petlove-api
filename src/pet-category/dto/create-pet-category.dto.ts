import { OmitType } from '@nestjs/mapped-types';
import { IsDefined, IsNotEmpty } from 'class-validator';
import { IsUnique } from 'src/utils/validator/unique-data.validator';
import { PetCategory } from '../entities/pet-category.entity';
import { PetCategoryDto } from './pet-category.dto';

export class CreatePetCategoryDto extends OmitType(PetCategoryDto, ['id']) {}
