import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { USER_ENDPOINT } from 'src/utils/constant/endpoint.constant';
import { CreateUserDeliveryAddressDto } from './dto/user-delivery-address.dto';
import { GetJwtPayload } from 'src/auth/decorators/jwt-payload.decorator';
import { InjectUserToBody } from './decorators/inject-user-body.decorator';

@Controller(USER_ENDPOINT)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  updateUser(@Param() params, @Body() updateUserDto: UpdateUserDto) {
    updateUserDto.id = params.id;
    return this.usersService.update(updateUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('delivery-address')
  addUserDeliveryAddress(
    @InjectUserToBody() createDeliveryAddressDto: CreateUserDeliveryAddressDto,
  ) {
    console.log(createDeliveryAddressDto);

    return this.usersService.addUserDeliveryAddress(createDeliveryAddressDto);
  }
}
