"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLoggerService = void 0;
const common_1 = require("@nestjs/common");
let MyLoggerService = class MyLoggerService {
    constructor() {
        this.allLevels = ['error', 'warn', 'log', 'debug', 'verbose'];
    }
    getLogs() {
        common_1.Logger.debug('Log level value is debug');
        common_1.Logger.log('Log level is log');
        common_1.Logger.warn('Log level is Warn');
        common_1.Logger.error('Log level is Error');
        var currentLevel = this.allLevels.filter((level) => common_1.Logger.isLevelEnabled(level));
        if (JSON.stringify(currentLevel) === '[]')
            return 'PORT: 3000 | Displayed log levels (default) are : application default';
        return `PORT: 3000 | Displayed log levels are : ${currentLevel}`;
    }
    setLogLevel(newLevel) {
        common_1.Logger.log('Controller: You want to change the log level to: ' + newLevel);
        common_1.Logger.overrideLogger([newLevel]);
        return 'Controller: Change successful!';
    }
};
MyLoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MyLoggerService);
exports.MyLoggerService = MyLoggerService;
//# sourceMappingURL=logger.service.js.map