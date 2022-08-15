import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { USER_ENDPOINT } from 'src/utils/constant/endpoint.constant';
import { CreateUserDeliveryAddressDto } from './dto/user-delivery-address.dto';
import { GetJwtPayload } from 'src/auth/decorators/jwt-payload.decorator';
import { InjectTokenPayload } from '../auth/decorators/inject-account-body.decorator';
import { IJwtPayload } from 'src/auth/interface/jwt-payload.interface';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { InjectAccountUuid } from 'src/auth/decorators/inject-account-uuid.decorator';
import { InjetUserToBody } from './interceptors/inject-user-to-body.interceptor';

@Controller(USER_ENDPOINT)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getUserProfile(@InjectAccountUuid() accountUuid: string) {
    return this.usersService.getUserByAccountID(accountUuid);
  }

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
  @UseInterceptors(InjetUserToBody)
  addUserDeliveryAddress(
    @Body() createDeliveryAddressDto: CreateUserDeliveryAddressDto,
  ) {
    return this.usersService.addUserDeliveryAddress(createDeliveryAddressDto);
  }
}
