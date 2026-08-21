import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de la documentación Swagger
  const config = new DocumentBuilder()
    .setTitle('API Tienda Virtual')
    .setDescription('Backend para gestión de productos, autenticación y roles')
    .setVersion('1.0')
    .addBearerAuth() // Habilita autenticación con Tokens JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
