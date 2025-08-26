import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from '../assets/dto/assets.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';

@ApiTags('projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'Project created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Brand or client not found' })
  create(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req: any,
  ) {
    return this.projectsService.createProject(
      createProjectDto,
      req.user.userId,
      req.user.tenantId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects with pagination' })
  @ApiResponse({ status: 200, description: 'Projects retrieved successfully' })
  findAll(@Query() pagination: PaginationDto, @Request() req: any) {
    return this.projectsService.getProjects(pagination, req.user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: 200, description: 'Project found' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.projectsService.getProject(id, req.user.tenantId);
  }

  @Get(':id/assets')
  @ApiOperation({ summary: 'Get all assets for a project' })
  @ApiResponse({ status: 200, description: 'Project assets retrieved' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  getProjectAssets(@Param('id') id: string, @Request() req: any) {
    return this.projectsService.getProjectAssets(id, req.user.tenantId);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get project statistics' })
  @ApiResponse({ status: 200, description: 'Project stats retrieved' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  getProjectStats(@Param('id') id: string, @Request() req: any) {
    return this.projectsService.getProjectStats(id, req.user.tenantId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project' })
  @ApiResponse({ status: 200, description: 'Project updated successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req: any,
  ) {
    return this.projectsService.updateProject(id, updateProjectDto, req.user.tenantId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project' })
  @ApiResponse({ status: 200, description: 'Project deleted successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 400, description: 'Cannot delete project with assets' })
  remove(@Param('id') id: string, @Request() req: any) {
    return this.projectsService.deleteProject(id, req.user.tenantId);
  }
}
