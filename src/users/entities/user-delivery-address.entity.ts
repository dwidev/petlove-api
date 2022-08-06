import { MaxLength } from 'class-validator';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_delivery_address')
export class UserDeliveryAddress {
  @Generated('increment')
  id: number;

  @PrimaryColumn()
  @Generated('uuid')
  uuid: string;

  @Column({ length: 50 })
  address_name: string;

  @Column()
  selected: boolean;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_uuid' })
  user: User;
}
