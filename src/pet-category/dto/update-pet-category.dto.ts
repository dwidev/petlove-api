import { PartialType } from '@nestjs/mapped-types';
import { CreatePetCategoryDto } from './create-pet-category.dto';

export class UpdatePetCategoryDto extends PartialType(CreatePetCategoryDto) {}
