import { Test, TestingModule } from '@nestjs/testing';
import { PetCategoryController } from './pet-category.controller';
import { PetCategoryService } from './pet-category.service';

describe('PetCategoryController', () => {
  let controller: PetCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetCategoryController],
      providers: [PetCategoryService],
    }).compile();

    controller = module.get<PetCategoryController>(PetCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
