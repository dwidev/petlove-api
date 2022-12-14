import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PetCategoryService } from './pet-category.service';
import { CreatePetCategoryDto } from './dto/create-pet-category.dto';
import { UpdatePetCategoryDto } from './dto/update-pet-category.dto';
import { PET_CATEGORY_ENDPOINT } from 'src/utils/constant/endpoint.constant';
import { PetCategoryCodeDto } from './dto/pet-category.dto';

@Controller(PET_CATEGORY_ENDPOINT)
export class PetCategoryController {
  constructor(private readonly petCategoryService: PetCategoryService) {}

  @Post()
  create(@Body() createPetCategoryDto: CreatePetCategoryDto) {
    return this.petCategoryService.create(createPetCategoryDto);
  }

  @Get()
  findAll() {
    return this.petCategoryService.findAll();
  }

  @Get(':code')
  findOne(@Param() params: PetCategoryCodeDto) {
    return this.petCategoryService.findOne(params.code);
  }

  @Patch(':code')
  update(
    @Param() params: PetCategoryCodeDto,
    @Body() updatePetCategoryDto: UpdatePetCategoryDto,
  ) {
    return this.petCategoryService.update(params.code, updatePetCategoryDto);
  }

  @Delete(':code')
  remove(@Param() params: PetCategoryCodeDto) {
    return this.petCategoryService.remove(params.code);
  }
}
