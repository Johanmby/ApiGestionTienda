import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'; // 1. Importar ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2. Activar validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Filtra las propiedades que no estén en el DTO
      forbidNonWhitelisted: true, // Lanza error si envían campos extraños
      transform: true, // Convierte automáticamente los tipos de datos (ej. String a Number)
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Tienda Virtual')
    .setDescription('Backend para gestión de productos, autenticación y roles')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
