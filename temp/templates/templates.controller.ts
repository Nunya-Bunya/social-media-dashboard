import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto, UpdateTemplateDto } from './dto/templates.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('templates')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new template' })
  @ApiResponse({ status: 201, description: 'Template created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createTemplate(
    @Body() createTemplateDto: CreateTemplateDto,
    @Request() req: any,
  ) {
    return this.templatesService.createTemplate(createTemplateDto, req.user.tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all templates with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'brandId', required: false, type: String })
  @ApiQuery({ name: 'type', required: false, enum: ['VIDEO', 'PRINT'] })
  @ApiResponse({ status: 200, description: 'Templates retrieved successfully' })
  async getTemplates(
    @Query() pagination: PaginationDto,
    @Request() req: any,
  ) {
    return this.templatesService.getTemplates(req.user.tenantId, pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific template' })
  @ApiParam({ name: 'id', description: 'Template ID' })
  @ApiResponse({ status: 200, description: 'Template retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  async getTemplate(@Param('id') id: string, @Request() req: any) {
    return this.templatesService.getTemplate(id, req.user.tenantId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a template' })
  @ApiParam({ name: 'id', description: 'Template ID' })
  @ApiResponse({ status: 200, description: 'Template updated successfully' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  async updateTemplate(
    @Param('id') id: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
    @Request() req: any,
  ) {
    return this.templatesService.updateTemplate(id, updateTemplateDto, req.user.tenantId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a template' })
  @ApiParam({ name: 'id', description: 'Template ID' })
  @ApiResponse({ status: 200, description: 'Template deleted successfully' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  @ApiResponse({ status: 400, description: 'Cannot delete template with associated projects' })
  async deleteTemplate(@Param('id') id: string, @Request() req: any) {
    return this.templatesService.deleteTemplate(id, req.user.tenantId);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate a template' })
  @ApiParam({ name: 'id', description: 'Template ID' })
  @ApiResponse({ status: 201, description: 'Template duplicated successfully' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  async duplicateTemplate(
    @Param('id') id: string,
    @Body() duplicateData: { name: string; description?: string },
    @Request() req: any,
  ) {
    return this.templatesService.duplicateTemplate(id, req.user.tenantId, duplicateData);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get template statistics' })
  @ApiParam({ name: 'id', description: 'Template ID' })
  @ApiResponse({ status: 200, description: 'Template statistics retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  async getTemplateStats(@Param('id') id: string, @Request() req: any) {
    return this.templatesService.getTemplateStats(id, req.user.tenantId);
  }
}
