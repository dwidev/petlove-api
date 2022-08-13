import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetCategory } from 'src/pet-category/entities/pet-category.entity';
import { PaginationParamsDto } from 'src/utils/dto/pagination.dto';
import { PaginationService } from 'src/utils/services/pagination/pagination.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService extends PaginationService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {
    super();
  }

  create(createProductDto: CreateProductDto) {
    const productCode = 'PRDCT' + Date.now();
    createProductDto.product_code = productCode;

    const product = {
      ...createProductDto,
      pet_category: {
        code: createProductDto.pet_category_code,
      },
      merchant: {
        uuid: createProductDto.merchant_uuid,
      },
    };

    return this.productRepo.save(product);
  }

  findAll(params: PaginationParamsDto) {
    return this.generatePage(params, this.productRepo, {
      relations: ['pet_category', 'merchant'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
