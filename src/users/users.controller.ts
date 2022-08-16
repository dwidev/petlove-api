import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  UseInterceptors,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { USER_ENDPOINT } from 'src/utils/constant/endpoint.constant';
import {
  CreateUserDeliveryAddressDto,
  UpdateUserDeliveryAddressDto,
} from './dto/user-delivery-address.dto';
import { InjectTokenPayload } from '../auth/decorators/inject-account-body.decorator';
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
  getUserDeliveryAddress(@Param('user_id') params: string) {
    return this.usersService.getUserDeliveryAddress(params);
  }

  @Post('delivery-address')
  @UseInterceptors(InjetUserToBody)
  addUserDeliveryAddress(
    @Body() createDeliveryAddressDto: CreateUserDeliveryAddressDto,
  ) {
    return this.usersService.addUserDeliveryAddress(createDeliveryAddressDto);
  }

  @Patch('delivery-address/:address_uuid')
  updateUserDeliveryAddress(
    @Param('address_uuid') address_uuid: string,
    @Body() updateDeliveryAddressDto: UpdateUserDeliveryAddressDto,
  ) {
    updateDeliveryAddressDto.uuid = address_uuid;
    return this.usersService.updateUserDeliveryAddress(
      updateDeliveryAddressDto,
    );
  }

  @Delete('delivery-address/:address_uuid')
  deletUserDeliveryAddress(@Param('address_uuid') address_uuid: string) {
    return this.usersService.deleteUserDelivery(address_uuid);
  }
}
