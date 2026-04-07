import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './env';
import { log } from '@repo/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(env.PORT);
  log(`api running on ${env.PORT}`);
}

bootstrap();
