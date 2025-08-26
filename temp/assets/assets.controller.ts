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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { AssetsService } from './assets.service';
import {
  CreateAssetDto,
  UpdateAssetDto,
  AssetSearchDto,
  BatchAssetOperationDto,
} from './dto/assets.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';

@ApiTags('assets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new asset' })
  @ApiResponse({ status: 201, description: 'Asset created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Project or client not found' })
  create(
    @Body() createAssetDto: CreateAssetDto,
    @Request() req: any,
  ) {
    return this.assetsService.createAsset(
      createAssetDto,
      req.user.userId,
      req.user.tenantId,
    );
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload asset file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name: { type: 'string' },
        type: { type: 'string', enum: ['PHOTO', 'VIDEO', 'AUDIO', 'DOCUMENT', 'GRAPHIC', 'ANIMATION'] },
        description: { type: 'string' },
        projectId: { type: 'string' },
        clientId: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadAsset(
    @UploadedFile() file: Express.Multer.File,
    @Body() assetData: any,
    @Request() req: any,
  ) {
    // Process file upload and create asset
    const createAssetDto: CreateAssetDto = {
      name: assetData.name || file.originalname,
      type: assetData.type,
      fileUrl: `uploads/${file.filename}`, // In production, this would be S3 URL
      fileSize: file.size,
      description: assetData.description,
      projectId: assetData.projectId,
      clientId: assetData.clientId,
      tags: assetData.tags ? JSON.parse(assetData.tags) : [],
    };

    return this.assetsService.createAsset(
      createAssetDto,
      req.user.userId,
      req.user.tenantId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all assets with pagination' })
  @ApiResponse({ status: 200, description: 'Assets retrieved successfully' })
  findAll(@Query() pagination: PaginationDto, @Request() req: any) {
    return this.assetsService.getAssets(pagination, req.user.tenantId);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search assets with filters' })
  @ApiResponse({ status: 200, description: 'Assets found' })
  search(@Query() searchDto: AssetSearchDto, @Request() req: any) {
    return this.assetsService.searchAssets(searchDto, req.user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get asset by ID' })
  @ApiResponse({ status: 200, description: 'Asset found' })
  @ApiResponse({ status: 404, description: 'Asset not found' })
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.assetsService.getAsset(id, req.user.tenantId);
  }

  @Get(':id/optimizations')
  @ApiOperation({ summary: 'Get asset optimizations' })
  @ApiResponse({ status: 200, description: 'Optimizations retrieved' })
  getOptimizations(@Param('id') id: string, @Request() req: any) {
    return this.assetsService.getAssetOptimizations(id, req.user.tenantId);
  }

  @Post(':id/optimize')
  @ApiOperation({ summary: 'Generate optimizations for asset' })
  @ApiResponse({ status: 200, description: 'Optimizations generated' })
  generateOptimizations(@Param('id') id: string, @Request() req: any) {
    return this.assetsService.generateOptimizations(id, req.user.tenantId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update asset' })
  @ApiResponse({ status: 200, description: 'Asset updated successfully' })
  @ApiResponse({ status: 404, description: 'Asset not found' })
  update(
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
    @Request() req: any,
  ) {
    return this.assetsService.updateAsset(id, updateAssetDto, req.user.tenantId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Archive asset (soft delete)' })
  @ApiResponse({ status: 200, description: 'Asset archived successfully' })
  @ApiResponse({ status: 404, description: 'Asset not found' })
  remove(@Param('id') id: string, @Request() req: any) {
    return this.assetsService.deleteAsset(id, req.user.tenantId);
  }

  @Post('batch')
  @ApiOperation({ summary: 'Perform batch operations on assets' })
  @ApiResponse({ status: 200, description: 'Batch operation completed' })
  batchOperation(
    @Body() batchDto: BatchAssetOperationDto,
    @Request() req: any,
  ) {
    return this.assetsService.batchOperation(batchDto, req.user.tenantId);
  }
}
