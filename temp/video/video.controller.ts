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
import { VideoService } from './video.service';
import { VideoAiService } from './video.ai.service';
import { VideoRenderService } from './video.render.service';
import {
  CreateVideoProjectDto,
  UpdateVideoProjectDto,
  CreateVideoVariantDto,
  RenderVideoDto,
} from './dto/video.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('video')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private readonly videoAiService: VideoAiService,
    private readonly videoRenderService: VideoRenderService,
  ) {}

  @Post('projects')
  @ApiOperation({ summary: 'Create a new video project' })
  @ApiResponse({ status: 201, description: 'Video project created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createProject(
    @Body() createDto: CreateVideoProjectDto,
    @Request() req: any,
  ) {
    return this.videoService.createProject(createDto, req.user.tenantId);
  }

  @Get('projects')
  @ApiOperation({ summary: 'Get all video projects with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Video projects retrieved successfully' })
  async getProjects(
    @Query() pagination: PaginationDto,
    @Request() req: any,
  ) {
    return this.videoService.getProjects(req.user.tenantId, pagination);
  }

  @Get('projects/:id')
  @ApiOperation({ summary: 'Get a specific video project' })
  @ApiParam({ name: 'id', description: 'Video project ID' })
  @ApiResponse({ status: 200, description: 'Video project retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Video project not found' })
  async getProject(@Param('id') id: string, @Request() req: any) {
    return this.videoService.getProject(id, req.user.tenantId);
  }

  @Put('projects/:id')
  @ApiOperation({ summary: 'Update a video project' })
  @ApiParam({ name: 'id', description: 'Video project ID' })
  @ApiResponse({ status: 200, description: 'Video project updated successfully' })
  @ApiResponse({ status: 404, description: 'Video project not found' })
  async updateProject(
    @Param('id') id: string,
    @Body() updateDto: UpdateVideoProjectDto,
    @Request() req: any,
  ) {
    return this.videoService.updateProject(id, updateDto, req.user.tenantId);
  }

  @Delete('projects/:id')
  @ApiOperation({ summary: 'Delete a video project' })
  @ApiParam({ name: 'id', description: 'Video project ID' })
  @ApiResponse({ status: 200, description: 'Video project deleted successfully' })
  @ApiResponse({ status: 404, description: 'Video project not found' })
  async deleteProject(@Param('id') id: string, @Request() req: any) {
    return this.videoService.deleteProject(id, req.user.tenantId);
  }

  @Post('projects/:id/variants')
  @ApiOperation({ summary: 'Create a new video variant' })
  @ApiParam({ name: 'id', description: 'Video project ID' })
  @ApiResponse({ status: 201, description: 'Video variant created successfully' })
  @ApiResponse({ status: 404, description: 'Video project not found' })
  async createVariant(
    @Param('id') projectId: string,
    @Body() createVariantDto: CreateVideoVariantDto,
    @Request() req: any,
  ) {
    return this.videoService.createVariant(
      projectId,
      createVariantDto.aspect,
      req.user.tenantId,
    );
  }

  @Post('projects/:id/render')
  @ApiOperation({ summary: 'Start video rendering' })
  @ApiParam({ name: 'id', description: 'Video project ID' })
  @ApiResponse({ status: 201, description: 'Video rendering started successfully' })
  @ApiResponse({ status: 404, description: 'Video project not found' })
  async renderVideo(
    @Param('id') projectId: string,
    @Body() renderDto: RenderVideoDto,
    @Request() req: any,
  ) {
    return this.videoRenderService.startRender(projectId, renderDto, req.user.tenantId);
  }

  @Post('projects/:id/generate-script')
  @ApiOperation({ summary: 'Generate video script using AI' })
  @ApiParam({ name: 'id', description: 'Video project ID' })
  @ApiResponse({ status: 200, description: 'Script generated successfully' })
  @ApiResponse({ status: 404, description: 'Video project not found' })
  async generateScript(
    @Param('id') projectId: string,
    @Body() body: { prompt: string; context?: any },
    @Request() req: any,
  ) {
    return this.videoAiService.generateScript(projectId, body.prompt, body.context, req.user.tenantId);
  }

  @Post('projects/:id/optimize-script')
  @ApiOperation({ summary: 'Optimize video script using AI' })
  @ApiParam({ name: 'id', description: 'Video project ID' })
  @ApiResponse({ status: 200, description: 'Script optimized successfully' })
  @ApiResponse({ status: 404, description: 'Video project not found' })
  async optimizeScript(
    @Param('id') projectId: string,
    @Body() body: { content: string },
    @Request() req: any,
  ) {
    return this.videoAiService.optimizeScript(projectId, body.content, req.user.tenantId);
  }
}
