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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const crypto_1 = require("crypto");
const util_1 = require("util");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
let AuthService = class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async signup(userDto) {
        console.log('Inside signup() method of AuthService.');
        if (await this.usersService.findByMail(userDto.email)) {
            throw new common_1.BadRequestException('email in use');
        }
        userDto.password = await this.generateHash(userDto.password);
        const user = await this.usersService.create(userDto);
        return user;
    }
    async validateUpdate(id, dto) {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException('user not found');
        }
        if (dto.email && await this.usersService.findByMail(dto.email)) {
            throw new common_1.BadRequestException('email in use');
        }
        if (dto.password) {
            dto.password = await this.generateHash(dto.password);
        }
        return this.usersService.update(user, dto);
    }
    async generateHash(password) {
        const salt = (0, crypto_1.randomBytes)(8).toString('hex');
        const hash = (await scrypt(password, salt, 32));
        return salt + '.' + hash.toString('hex');
    }
    async signin(email, password) {
        console.log('Inside signin() method of AuthService.');
        const user = await this.usersService.findByMail(email);
        if (!user) {
            throw new common_1.NotFoundException('user not found');
        }
        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32));
        if (storedHash !== hash.toString('hex')) {
            throw new common_1.BadRequestException('bad password');
        }
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map