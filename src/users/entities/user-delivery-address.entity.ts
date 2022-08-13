import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_delivery_address')
export class UserDeliveryAddress {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ length: 50 })
  address_name: string;

  @Column()
  selected: boolean;

  @ManyToOne(() => User, (user) => user.uuid)
  @JoinColumn({ name: 'user_uuid' })
  user: User;
}
