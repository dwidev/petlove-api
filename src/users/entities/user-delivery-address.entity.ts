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
  name: string;

  @Column({ length: 50 })
  phone_number: string;

  @Column()
  street_name: string;

  @Column({ nullable: true })
  detail_other: string;

  @Column({ length: 50 })
  province: string;

  @Column({ length: 50 })
  district: string;

  @Column({ length: 50 })
  village: string;

  @Column({ length: 10 })
  rt: string;

  @Column({ length: 10 })
  rw: string;

  @Column({ length: 10 })
  postal_code: string;

  @Column({ nullable: true })
  address_type: number; // 0 for office, 1 for home

  @Column({ default: 0 })
  selected: boolean;

  @ManyToOne(() => User, (user) => user.uuid)
  @JoinColumn({ name: 'user_uuid' })
  user: User;
}
