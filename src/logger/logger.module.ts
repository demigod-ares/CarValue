import { Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { MyLoggerService } from './logger.service';

@Module({
  controllers: [LoggerController],
  providers: [MyLoggerService]
})
export class LoggerModule { }