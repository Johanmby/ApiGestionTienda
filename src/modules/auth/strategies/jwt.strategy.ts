import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

export interface JwtPayload {
  sub: string;
  email: string;
  roles: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MI_CLAVE_SECRETA_SUPER_SEGURA', // Debe coincidir con la clave de AuthModule
    });
  }

  validate(payload: JwtPayload) {
    const user = this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Token no válido o usuario inactivo');
    }
    return user; // Este objeto estará disponible en req.user
  }
}
