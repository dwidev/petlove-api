import { Exclude } from 'class-transformer';
import { IsEmail, IsOptional } from 'class-validator';
import { IsUnique } from 'src/utils/validator/unique-data.validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDeliveryAddress } from './user-delivery-address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @OneToMany(() => UserDeliveryAddress, (useraddress) => useraddress.user)
  user_delivery_address: UserDeliveryAddress[];
}
