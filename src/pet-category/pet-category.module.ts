import { Module } from '@nestjs/common';
import { PetCategoryService } from './pet-category.service';
import { PetCategoryController } from './pet-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetCategory } from './entities/pet-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetCategory])],
  controllers: [PetCategoryController],
  providers: [PetCategoryService],
})
export class PetCategoryModule {}
