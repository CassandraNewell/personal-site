import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from '@repo/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const port = process.env.PORT || 5001;
  await app.listen(port);
  log(`api running on ${port}`);
}

bootstrap();
