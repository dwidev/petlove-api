import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { InjectUserToBody } from 'src/users/decorators/inject-user-body.decorator';
import { userInfo } from 'os';
import { MERCHANT_ENDPOINT } from 'src/utils/constant/endpoint.constant';

@Controller(MERCHANT_ENDPOINT)
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post()
  create(
    @InjectUserToBody() user,
    @Body() createMerchantDto: CreateMerchantDto,
  ) {
    console.log(user);
    return this.merchantService.create(createMerchantDto);
  }

  @Get()
  findAll() {
    return this.merchantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) {
    return this.merchantService.update(+id, updateMerchantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantService.remove(+id);
  }
}
