import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    return {
      message: 'Usuario registrado exitosamente',
      user,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        'Credenciales inválidas (email incorrecto)',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Credenciales inválidas (contraseña incorrecta)',
      );
    }

    const payload = { sub: user.id, email: user.email, roles: user.roles };

    const userWithoutPassword = { ...user };
    delete (userWithoutPassword as Partial<User>).password;

    return {
      user: userWithoutPassword,
      token: this.jwtService.sign(payload),
    };
  }
}
