import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CRMService } from './crm.service';
import { LeadService } from './lead.service';
import { PrismaService } from '../common/prisma.service';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('crm')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('crm')
export class CRMController {
  constructor(
    private readonly crmService: CRMService,
    private readonly leadService: LeadService,
    private readonly prisma: PrismaService,
  ) {}

  // Lead Management
  @Post('leads')
  @ApiOperation({ summary: 'Create a new lead' })
  @ApiResponse({ status: 201, description: 'Lead created successfully' })
  createLead(@Body() createLeadDto: any, @Request() req: any) {
    return this.leadService.create(createLeadDto, req.user.tenantId);
  }

  @Get('leads')
  @ApiOperation({ summary: 'Get all leads with pagination' })
  @ApiResponse({ status: 200, description: 'Leads retrieved successfully' })
  findAllLeads(@Query() pagination: PaginationDto, @Request() req: any) {
    return this.leadService.findAll(pagination, req.user.tenantId);
  }

  @Get('leads/:id')
  @ApiOperation({ summary: 'Get lead by ID' })
  @ApiResponse({ status: 200, description: 'Lead found' })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  findOneLead(@Param('id') id: string, @Request() req: any) {
    return this.leadService.findOne(id, req.user.tenantId);
  }

  @Patch('leads/:id')
  @ApiOperation({ summary: 'Update lead' })
  @ApiResponse({ status: 200, description: 'Lead updated successfully' })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  updateLead(@Param('id') id: string, @Body() updateLeadDto: any, @Request() req: any) {
    return this.leadService.update(id, updateLeadDto, req.user.tenantId);
  }

  @Delete('leads/:id')
  @ApiOperation({ summary: 'Delete lead' })
  @ApiResponse({ status: 200, description: 'Lead deleted successfully' })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  removeLead(@Param('id') id: string, @Request() req: any) {
    return this.leadService.remove(id, req.user.tenantId);
  }

  // CRM Dashboard
  @Get('dashboard')
  @ApiOperation({ summary: 'Get CRM dashboard data' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved' })
  getDashboard(@Request() req: any) {
    return this.crmService.getDashboard(req.user.tenantId);
  }

  // Lead Activities
  @Post('leads/:id/activities')
  @ApiOperation({ summary: 'Create lead activity' })
  @ApiResponse({ status: 201, description: 'Activity created successfully' })
  createLeadActivity(@Param('id') id: string, @Body() createActivityDto: any, @Request() req: any) {
    return this.leadService.createActivity(id, createActivityDto, req.user.tenantId);
  }

  @Get('leads/:id/activities')
  @ApiOperation({ summary: 'Get lead activities' })
  @ApiResponse({ status: 200, description: 'Activities retrieved' })
  getLeadActivities(@Param('id') id: string, @Request() req: any) {
    return this.leadService.getActivities(id, req.user.tenantId);
  }

  @Patch('activities/:id')
  @ApiOperation({ summary: 'Update lead activity' })
  @ApiResponse({ status: 200, description: 'Activity updated successfully' })
  updateLeadActivity(@Param('id') id: string, @Body() updateActivityDto: any, @Request() req: any) {
    return this.leadService.updateActivity(id, updateActivityDto, req.user.tenantId);
  }

  @Delete('activities/:id')
  @ApiOperation({ summary: 'Delete lead activity' })
  @ApiResponse({ status: 200, description: 'Activity deleted successfully' })
  removeLeadActivity(@Param('id') id: string, @Request() req: any) {
    return this.leadService.removeActivity(id, req.user.tenantId);
  }
}
