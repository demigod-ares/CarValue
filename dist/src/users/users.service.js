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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
let UsersService = class UsersService {
    constructor(repo) {
        this.repo = repo;
    }
    create(userDto) {
        console.log('Inside create() method of UsersService.');
        const user = this.repo.create(userDto);
        return this.repo.save(user);
    }
    findOne(id) {
        console.log('Inside findOne() method of UsersService.');
        if (!id) {
            return null;
        }
        return this.repo.findOneBy({ id });
    }
    findByMail(email) {
        console.log('Inside findByMail() method of UsersService.');
        return this.repo.findOneBy({ email });
    }
    async findByUsername(username) {
        console.log('Inside findByUsername() method of UsersService.');
        const user = await this.repo.find({ where: { username } });
        if (user.length)
            return user;
        return 'No user exist with given username.';
    }
    async update(user, attrs) {
        console.log('Inside update() method of UsersService.');
        Object.assign(user, attrs);
        return this.repo.save(user);
    }
    async remove(id) {
        console.log('Inside remove() method of UsersService.');
        const user = await this.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException('user not found');
        }
        return this.repo.remove(user);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map