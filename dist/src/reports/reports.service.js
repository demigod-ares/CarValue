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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const report_entity_1 = require("./report.entity");
let ReportsService = class ReportsService {
    constructor(repo) {
        this.repo = repo;
    }
    createEstimate({ make, model, lng, lat, year, mileage }) {
        console.log('Inside createEstimate() method of ReportsService.');
        return this.repo
            .createQueryBuilder()
            .select('AVG(price)', 'price')
            .where('make = :make', { make })
            .andWhere('model = :model', { model })
            .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
            .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
            .andWhere('year - :year BETWEEN -3 AND 3', { year })
            .andWhere('approved IS TRUE')
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            .setParameters({ mileage })
            .limit(3)
            .getRawOne();
    }
    create(reportDto, user) {
        console.log('Inside create() method of ReportsService.');
        const report = this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report);
    }
    async changeApproval(id, approved) {
        console.log('Inside changeApproval() method of ReportsService.');
        const report = await this.repo.findOneBy({ id });
        if (!report) {
            throw new common_1.NotFoundException('report not found');
        }
        report.approved = approved;
        return this.repo.save(report);
    }
    findOne(id) {
        console.log('Inside findOne() method of ReportsService.');
        if (!id) {
            return null;
        }
        return this.repo.findOneBy({ id });
    }
    async findAll() {
        console.log('Inside findAll() method of ReportsService.');
        const user = await this.repo.find();
        if (user.length)
            return user;
        return 'No user exist with given username.';
    }
};
ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_entity_1.Report)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReportsService);
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map