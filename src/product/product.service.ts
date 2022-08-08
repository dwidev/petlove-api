import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    return 'This action adds a new product';
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
