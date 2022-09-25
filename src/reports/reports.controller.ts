import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    console.log('Inside getEstimate() method of ReportsController.');
    return this.reportsService.createEstimate(query);
  }

  @Get('/:id')
  async findReport(@Param('id') id: number) {
    console.log('Inside findReport() method of ReportsController.');
    const user = await this.reportsService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get('/reports/all/')
  findAll() {
    console.log('Inside getEstimate() method of ReportsController.');
    return this.reportsService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard) // Guard at route level. Forbidden resource without Login.
  @Serialize(ReportDto) // Response will hide user details, but why only primary key userId is stored in database?
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    console.log('Inside createReport() method of ReportsController.');
    return this.reportsService.create(body, user);
  }

  @Patch('/:id') // PUT is used when we modify entire resource
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: number, @Body() body: ApproveReportDto) {
    console.log('Inside approveReport() method of ReportsController.');
    return this.reportsService.changeApproval(id, body.approved);
  }
}
