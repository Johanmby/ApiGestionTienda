import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  name!: string;

  @Column('text', { unique: true })
  email!: string;

  @Column('text')
  password!: string;

  @Column('text', { array: true, default: [Role.USER] })
  roles!: Role[];

  @Column('boolean', { default: true })
  isActive!: boolean;
}
