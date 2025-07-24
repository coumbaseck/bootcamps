import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔐 Active la validation des DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les champs non déclarés dans le DTO
      forbidNonWhitelisted: true, // Lève une erreur si un champ non autorisé est présent
      transform: true, // Convertit automatiquement les types (ex: string en number)
    }),
  );
  app.enableCors({
    origin: "http://localhost:3001", // autorise ton frontend
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
