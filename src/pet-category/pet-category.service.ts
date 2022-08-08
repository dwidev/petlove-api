import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateUuid } from 'src/utils/functions/generate-uuid.funtion';
import { Repository } from 'typeorm';
import { CreatePetCategoryDto } from './dto/create-pet-category.dto';
import { UpdatePetCategoryDto } from './dto/update-pet-category.dto';
import { PetCategory } from './entities/pet-category.entity';

@Injectable()
export class PetCategoryService {
  constructor(
    @InjectRepository(PetCategory)
    private readonly petCategoryRepo: Repository<PetCategory>,
  ) {}

  async create(
    createPetCategoryDto: CreatePetCategoryDto,
  ): Promise<PetCategory> {
    return this.petCategoryRepo.save(createPetCategoryDto);
  }

  async findAll(): Promise<Array<PetCategory>> {
    return this.petCategoryRepo.find();
  }

  async findOne(code: string): Promise<PetCategory | undefined | null> {
    return this.petCategoryRepo.findOne({ where: { code } });
  }

  async update(code: string, updatePetCategoryDto: UpdatePetCategoryDto) {
    return this.petCategoryRepo.update({ code }, updatePetCategoryDto);
  }

  async remove(code: string) {
    return this.petCategoryRepo.delete({ code });
  }
}
