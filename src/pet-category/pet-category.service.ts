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
    createPetCategoryDto.uuid = generateUuid();
    return this.petCategoryRepo.save(createPetCategoryDto);
  }

  async findAll(): Promise<Array<PetCategory>> {
    return this.petCategoryRepo.find();
  }

  async findOne(uuid: string): Promise<PetCategory | undefined | null> {
    return this.petCategoryRepo.findOne({ where: { uuid } });
  }

  async update(uuid: string, updatePetCategoryDto: UpdatePetCategoryDto) {
    return this.petCategoryRepo.update({ uuid }, updatePetCategoryDto);
  }

  async remove(uuid: string) {
    return this.petCategoryRepo.delete({ uuid });
  }
}
