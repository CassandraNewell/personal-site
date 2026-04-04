import { Module } from '@nestjs/common';
import { StatusController } from './status/status.controller';
import { MessageController } from './message/message.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [StatusController, MessageController],
})
export class AppModule {}
