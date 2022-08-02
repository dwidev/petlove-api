import { Exclude } from 'class-transformer';
import { IsEmail, IsOptional } from 'class-validator';
import { IsUnique } from 'src/utils/validator/unique-data.validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'text', nullable: true })
  @Exclude()
  refresh_token: string;
}
