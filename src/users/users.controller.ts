import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_ENDPOINT } from 'src/utils/constant/endpoint.constant';
import { CreateUserDeliveryAddressDto } from './dto/user-delivery-address.dto';
import { GetJwtPayload } from 'src/auth/decorators/jwt-payload.decorator';
import { InjectUserToBody } from './decorators/inject-user-body.decorator';
import { IJwtPayload } from 'src/auth/interface/jwt-payload.interface';

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

  @Get('delivery-address')
  getUserDeliveryAddress(@GetJwtPayload() payload: IJwtPayload) {
    return this.usersService.getUserDeliveryAddress(payload.id);
  }

  @Post('delivery-address')
  addUserDeliveryAddress(
    @InjectUserToBody() createDeliveryAddressDto: CreateUserDeliveryAddressDto,
  ) {
    return this.usersService.addUserDeliveryAddress(createDeliveryAddressDto);
  }
}
