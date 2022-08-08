import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PetCategory {
  @PrimaryColumn({ length: 10 })
  code: string;

  @Column({ length: 20 })
  category_name: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
