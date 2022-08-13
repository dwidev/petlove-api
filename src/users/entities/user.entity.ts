import { Account } from 'src/auth/entities/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDeliveryAddress } from './user-delivery-address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  full_name: string;

  @Column({ length: 50 })
  photo_profile: string;

  @Column()
  pet_interets: string;

  @OneToOne(() => Account, (acc) => acc.uuid)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @OneToMany(() => UserDeliveryAddress, (useraddress) => useraddress.user)
  user_delivery_address: UserDeliveryAddress[];
}
