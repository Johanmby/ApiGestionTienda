export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export class User {
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  roles!: Role[];
  isActive!: boolean;
}
