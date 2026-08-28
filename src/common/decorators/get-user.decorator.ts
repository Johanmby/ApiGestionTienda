import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../modules/users/entities/user.entity';

interface RequestWithUser extends Request {
  user?: Omit<User, 'password'>;
}

export const GetUser = createParamDecorator(
  (data: keyof Omit<User, 'password'> | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      throw new InternalServerErrorException(
        'Usuario no encontrado en la petición (JwtAuthGuard omitido)',
      );
    }

    return data ? user[data] : user;
  },
);
