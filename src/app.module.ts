import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { GuardsModule } from './common/guards/guards.module';
import { InterceptorsModule } from './common/interceptors/interceptors.module';
import { MiddlewaresModule } from './common/middlewares/middlewares.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    AuthModule,
    GuardsModule,
    InterceptorsModule,
    MiddlewaresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
