import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //transformação
      transform: true,

      //Ignorar o que não tiver no DTO
      whitelist: true,

      //Lançar um erro para o que não tiver no DTO
      forbidNonWhitelisted: true,
    }),
  );
  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });
  await app.listen(3000);
}
bootstrap();
