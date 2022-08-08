import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class Merchant {
  @PrimaryColumn('uuid')
  uuid: string;

  @Column({ length: 20 })
  merchant_name: string;

  @Column({ length: 50 })
  location: string;

  @Column({ length: 20 })
  image: string;
}
