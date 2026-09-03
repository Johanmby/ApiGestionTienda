import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Asegúrate de importar TypeOrmModule y la entidad User
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exporta UsersService para que pueda ser utilizado en otros módulos
})
export class UsersModule {}
