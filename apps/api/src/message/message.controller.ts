import { Controller, Get, Param } from '@nestjs/common';

@Controller('message')
export class MessageController {
  @Get(':name')
  getMessage(@Param('name') name: string) {
    return { message: `hello ${name}` };
  }
}
