import { LogLevel } from "@nestjs/common";
import { MyLoggerService } from "./logger.service";
export declare class LoggerController {
    loggerService: MyLoggerService;
    constructor(loggerService: MyLoggerService);
    getLogs(): string;
    setLevel(newLevel: LogLevel): string;
}
