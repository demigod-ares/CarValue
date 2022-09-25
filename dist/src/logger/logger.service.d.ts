import { LogLevel } from '@nestjs/common';
export declare class MyLoggerService {
    constructor();
    private allLevels;
    getLogs(): string;
    setLogLevel(newLevel: LogLevel): string;
}
