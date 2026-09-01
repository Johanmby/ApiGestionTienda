import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  name!: string;

  @Column('text')
  description!: string;

  @Column('numeric', { precision: 10, scale: 2 })
  price!: number;

  @Column('int', { default: 0 })
  stock!: number;

  @Column('boolean', { default: true })
  isActive!: boolean;
}
