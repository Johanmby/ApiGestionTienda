import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs'; // <-- Importación limpia para bcryptjs
import { CreateUserDto } from './dtos/create-user.dto';
import { Role, User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { email, password, roles, name } = createUserDto;

    const existingUser = this.users.find((u) => u.email === email);
    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    // bcryptjs resuelve la promesa con un string fuertemente tipado
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      roles: roles && roles.length > 0 ? roles : [Role.USER],
      isActive: true,
    };

    this.users.push(newUser);

    // En el método create()
    const userWithoutPassword = { ...newUser };
    delete (userWithoutPassword as Partial<User>).password;
    return userWithoutPassword;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  findById(id: string): Omit<User, 'password'> {
    // En el método findById()
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    const userWithoutPassword = { ...user };
    delete (userWithoutPassword as Partial<User>).password;
    return userWithoutPassword;
  }
}
