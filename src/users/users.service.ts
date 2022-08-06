import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { generateUuid } from 'src/utils/functions/generate-uuid.funtion';
import { toHash } from 'src/utils/functions/bcrypt.function';
import { UserDeliveryAddress } from './entities/user-delivery-address.entity';
import { CreateUserDeliveryAddressDto } from './dto/user-delivery-address.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) readonly userRepository: Repository<User>,
    @InjectRepository(UserDeliveryAddress)
    private readonly userDeliveryRepo: Repository<UserDeliveryAddress>,
  ) {}

  getUserByUsername(username: string): Promise<User | undefined> {
    const whereQuery = { username };
    const user = this.userRepository.findOneBy(whereQuery);

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.uuid = generateUuid();
    createUserDto.password = await toHash(createUserDto.password);
    return this.userRepository.save(createUserDto);
  }

  async update(updateUserDto: UpdateUserDto): Promise<void> {
    await this.userRepository.update(updateUserDto.id, updateUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['user_delivery_address'] });
  }

  async addUserDeliveryAddress(
    createUserDeliveryDto: CreateUserDeliveryAddressDto,
  ): Promise<UserDeliveryAddress> {
    return await this.userDeliveryRepo.save(createUserDeliveryDto);
  }
}
