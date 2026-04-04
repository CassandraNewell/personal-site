import { Module } from '@nestjs/common';
import { StatusController } from './status/status.controller';
import { MessageController } from './message/message.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StatusController, MessageController],
})
export class AppModule {}
