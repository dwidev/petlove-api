import { Merchant } from 'src/merchant/entities/merchant.entity';
import { PetCategory } from 'src/pet-category/entities/pet-category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @Generated('uuid')
  @Column({ length: 225 })
  uuid: string;

  @PrimaryColumn({ length: 20 })
  product_code: string;

  @ManyToOne(() => PetCategory, (petcat) => petcat.code)
  @JoinColumn({ name: 'pet_category_code' })
  pet_category: PetCategory;

  @ManyToOne(() => Merchant, (merchant) => merchant.uuid)
  @JoinColumn({ name: 'merchant_uuid' })
  merchant: Merchant;

  @Column({ length: 50 })
  product_name: string;

  @Column({ length: 500 })
  description: string;

  @Column({ length: 15 })
  image: string;

  @Column()
  stock: number;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ default: 0 })
  soft_delete: boolean;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
