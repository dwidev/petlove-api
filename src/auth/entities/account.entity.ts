import { Exclude } from 'class-transformer';
import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryColumn()
  @Generated('uuid')
  uuid: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'text', nullable: true })
  @Exclude()
  refresh_token: string;
}
