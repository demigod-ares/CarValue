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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerController = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("./logger.service");
let LoggerController = class LoggerController {
    constructor(loggerService) {
        this.loggerService = loggerService;
    }
    getLogs() {
        return this.loggerService.getLogs();
    }
    setLevel(newLevel) {
        return this.loggerService.setLogLevel(newLevel);
    }
};
__decorate([
    (0, common_1.Get)('/level'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LoggerController.prototype, "getLogs", null);
__decorate([
    (0, common_1.Put)('/:newLevel'),
    __param(0, (0, common_1.Param)('newLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoggerController.prototype, "setLevel", null);
LoggerController = __decorate([
    (0, common_1.Controller)('/logs'),
    __metadata("design:paramtypes", [logger_service_1.MyLoggerService])
], LoggerController);
exports.LoggerController = LoggerController;
//# sourceMappingURL=logger.controller.js.map