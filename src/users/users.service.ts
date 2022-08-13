import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDeliveryAddress } from './entities/user-delivery-address.entity';
import { CreateUserDeliveryAddressDto } from './dto/user-delivery-address.dto';
import {
  UserAlreadyException,
  UserNotFoundException,
} from './exceptions/user.exception';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) readonly userRepository: Repository<User>,
    @InjectRepository(UserDeliveryAddress)
    private readonly userDeliveryRepo: Repository<UserDeliveryAddress>,
  ) {}

  async getUserByAccountID(accountID: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { account: { uuid: accountID } },
      relations: { account: true },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async createUserProfile(createUserDto: CreateUserDto): Promise<User> {
    const alreadyUser =
      (await this.userRepository.count({
        where: { account: createUserDto.account },
      })) == 1;

    if (alreadyUser) {
      throw new UserAlreadyException();
    }

    return this.userRepository.save(createUserDto);
  }

  async updateProfile(updateUserDto: UpdateUserDto): Promise<void> {
    console.log(updateUserDto.account.uuid);

    await this.userRepository.update(
      { account: updateUserDto.account },
      updateUserDto,
    );
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: { account: true, user_delivery_address: true },
    });
  }

  async getUserDeliveryAddress(
    userUuid: string,
  ): Promise<UserDeliveryAddress[]> {
    const user = new User();
    user.uuid = userUuid;

    return await this.userDeliveryRepo.find({
      where: { user: user },
    });
  }

  async addUserDeliveryAddress(
    createUserDeliveryDto: CreateUserDeliveryAddressDto,
  ): Promise<UserDeliveryAddress> {
    return await this.userDeliveryRepo.save(createUserDeliveryDto);
  }
}
