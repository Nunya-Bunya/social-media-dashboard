import { IsString, IsOptional, IsEnum, IsArray, IsNumber, IsDateString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AssetType, AssetStatus, PlatformType } from '@prisma/client';

export class CreateAssetDto {
  @ApiProperty({ description: 'Asset name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Asset type', enum: AssetType })
  @IsEnum(AssetType)
  type: AssetType;

  @ApiProperty({ description: 'File URL' })
  @IsString()
  fileUrl: string;

  @ApiProperty({ description: 'Thumbnail URL', required: false })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiProperty({ description: 'Original file URL', required: false })
  @IsOptional()
  @IsString()
  originalUrl?: string;

  @ApiProperty({ description: 'File size in bytes' })
  @IsNumber()
  fileSize: number;

  @ApiProperty({ description: 'Image/video dimensions', required: false })
  @IsOptional()
  dimensions?: { width: number; height: number };

  @ApiProperty({ description: 'Video duration in seconds', required: false })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiProperty({ description: 'EXIF metadata', required: false })
  @IsOptional()
  metadata?: any;

  @ApiProperty({ description: 'Manual tags', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ description: 'Asset description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Project ID', required: false })
  @IsOptional()
  @IsString()
  projectId?: string;

  @ApiProperty({ description: 'Client ID', required: false })
  @IsOptional()
  @IsString()
  clientId?: string;
}

export class UpdateAssetDto {
  @ApiProperty({ description: 'Asset name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Asset status', enum: AssetStatus, required: false })
  @IsOptional()
  @IsEnum(AssetStatus)
  status?: AssetStatus;

  @ApiProperty({ description: 'Manual tags', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ description: 'AI-generated tags', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  aiTags?: string[];

  @ApiProperty({ description: 'Quality score', required: false })
  @IsOptional()
  @IsNumber()
  qualityScore?: number;

  @ApiProperty({ description: 'Asset description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Asset notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'Project ID', required: false })
  @IsOptional()
  @IsString()
  projectId?: string;

  @ApiProperty({ description: 'Client ID', required: false })
  @IsOptional()
  @IsString()
  clientId?: string;
}

export class AssetSearchDto {
  @ApiProperty({ description: 'Search query', required: false })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiProperty({ description: 'Asset type filter', enum: AssetType, required: false })
  @IsOptional()
  @IsEnum(AssetType)
  type?: AssetType;

  @ApiProperty({ description: 'Asset status filter', enum: AssetStatus, required: false })
  @IsOptional()
  @IsEnum(AssetStatus)
  status?: AssetStatus;

  @ApiProperty({ description: 'Client ID filter', required: false })
  @IsOptional()
  @IsString()
  clientId?: string;

  @ApiProperty({ description: 'Project ID filter', required: false })
  @IsOptional()
  @IsString()
  projectId?: string;

  @ApiProperty({ description: 'Tags filter', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ description: 'Date range start', required: false })
  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @ApiProperty({ description: 'Date range end', required: false })
  @IsOptional()
  @IsDateString()
  dateTo?: string;
}

export class BatchAssetOperationDto {
  @ApiProperty({ description: 'Asset IDs to operate on' })
  @IsArray()
  @IsString({ each: true })
  assetIds: string[];

  @ApiProperty({ description: 'Operation type', enum: ['tag', 'organize', 'deploy', 'archive'] })
  @IsString()
  operation: 'tag' | 'organize' | 'deploy' | 'archive';

  @ApiProperty({ description: 'Operation data', required: false })
  @IsOptional()
  data?: any;
}

export class CreateProjectDto {
  @ApiProperty({ description: 'Project name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Project description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Project type', example: 'photography' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Start date', required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'End date', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ description: 'Project budget', required: false })
  @IsOptional()
  @IsNumber()
  budget?: number;

  @ApiProperty({ description: 'Project deliverables', required: false })
  @IsOptional()
  deliverables?: any;

  @ApiProperty({ description: 'Project timeline', required: false })
  @IsOptional()
  timeline?: any;

  @ApiProperty({ description: 'Project notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'Brand ID', required: false })
  @IsOptional()
  @IsString()
  brandId?: string;

  @ApiProperty({ description: 'Client ID', required: false })
  @IsOptional()
  @IsString()
  clientId?: string;
}

export class UpdateProjectDto {
  @ApiProperty({ description: 'Project name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Project description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Project status', required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ description: 'Start date', required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'End date', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ description: 'Project budget', required: false })
  @IsOptional()
  @IsNumber()
  budget?: number;

  @ApiProperty({ description: 'Project deliverables', required: false })
  @IsOptional()
  deliverables?: any;

  @ApiProperty({ description: 'Project timeline', required: false })
  @IsOptional()
  timeline?: any;

  @ApiProperty({ description: 'Project notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateIntegrationDto {
  @ApiProperty({ description: 'Platform type', enum: PlatformType })
  @IsEnum(PlatformType)
  platform: PlatformType;

  @ApiProperty({ description: 'Integration name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Integration configuration' })
  config: any;
}

export class CreateDeploymentDto {
  @ApiProperty({ description: 'Asset ID' })
  @IsString()
  assetId: string;

  @ApiProperty({ description: 'Platform type', enum: PlatformType })
  @IsEnum(PlatformType)
  platform: PlatformType;

  @ApiProperty({ description: 'Scheduled date', required: false })
  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @ApiProperty({ description: 'Post caption', required: false })
  @IsOptional()
  @IsString()
  caption?: string;

  @ApiProperty({ description: 'Hashtags', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hashtags?: string[];
}

export class CreateClientPortalDto {
  @ApiProperty({ description: 'Portal name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Portal description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Expiration date', required: false })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @ApiProperty({ description: 'Portal settings', required: false })
  @IsOptional()
  settings?: any;
}
