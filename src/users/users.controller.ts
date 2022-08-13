import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { USER_ENDPOINT } from 'src/utils/constant/endpoint.constant';
import { CreateUserDeliveryAddressDto } from './dto/user-delivery-address.dto';
import { GetJwtPayload } from 'src/auth/decorators/jwt-payload.decorator';
import { InjectTokenPayload } from '../auth/decorators/inject-account-body.decorator';
import { IJwtPayload } from 'src/auth/interface/jwt-payload.interface';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller(USER_ENDPOINT)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('profile')
  userProfile(@InjectTokenPayload() createUserDto: CreateUserDto) {
    return this.usersService.createUserProfile(createUserDto);
  }

  @Patch('update/profile')
  updateProfile(@InjectTokenPayload() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(updateUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('delivery-address/:user_id')
  getUserDeliveryAddress(@GetJwtPayload() payload: IJwtPayload) {
    return this.usersService.getUserDeliveryAddress('');
  }

  @Post('delivery-address')
  addUserDeliveryAddress(
    @InjectTokenPayload()
    createDeliveryAddressDto: CreateUserDeliveryAddressDto,
  ) {
    return this.usersService.addUserDeliveryAddress(createDeliveryAddressDto);
  }
}
