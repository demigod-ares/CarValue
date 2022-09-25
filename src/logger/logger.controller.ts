import { Controller, Get, LogLevel, Param, Put } from "@nestjs/common";
import { MyLoggerService } from "./logger.service";

@Controller('/logs')
export class LoggerController {
  constructor(public loggerService: MyLoggerService) { }

  @Get('/level')
  getLogs() {
    return this.loggerService.getLogs();    
  }

  @Put('/:newLevel')
  setLevel(@Param('newLevel') newLevel: LogLevel) {
    return this.loggerService.setLogLevel(newLevel);
  }
}