import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Merchant {
  @PrimaryColumn('uuid')
  uuid: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 20 })
  merchant_name: string;

  @Column({ length: 50 })
  location: string;

  @Column({ length: 20 })
  image: string;
}
