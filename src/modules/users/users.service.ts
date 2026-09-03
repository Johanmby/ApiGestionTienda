import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Role, User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { email, password, roles, name } = createUserDto;

    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      roles: roles && roles.length > 0 ? roles : [Role.USER],
    });

    await this.userRepository.save(newUser);

    const userWithoutPassword = { ...newUser };
    delete (userWithoutPassword as Partial<User>).password;
    return userWithoutPassword;
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map((user) => {
      const userWithoutPassword = { ...user };
      delete (userWithoutPassword as Partial<User>).password;
      return userWithoutPassword;
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const userWithoutPassword = { ...user };
    delete (userWithoutPassword as Partial<User>).password;
    return userWithoutPassword;
  }
}
