import { Injectable, Logger, LogLevel } from '@nestjs/common';

@Injectable()
export class MyLoggerService {
  // LoggerService exist in library
  constructor() {}

  private allLevels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];
  getLogs() {
    Logger.debug('Log level value is debug');
    Logger.log('Log level is log');
    Logger.warn('Log level is Warn');
    Logger.error('Log level is Error');
    var currentLevel = this.allLevels.filter((level) =>
      Logger.isLevelEnabled(level),
    );
    if (JSON.stringify(currentLevel) === '[]')
      return 'PORT: 3000 | Displayed log levels (default) are : application default';

    return `PORT: 3000 | Displayed log levels are : ${currentLevel}`;
  }

  setLogLevel(newLevel: LogLevel) {
    Logger.log('Controller: You want to change the log level to: ' + newLevel);
    Logger.overrideLogger([newLevel]);

    return 'Controller: Change successful!';
  }
}
