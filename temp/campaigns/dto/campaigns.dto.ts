import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsUUID, IsObject, IsDateString, IsNumber, IsArray, IsBoolean } from 'class-validator';
import { CampaignGoal, CampaignType, CampaignStatus } from '@prisma/client';

export class CreateCampaignDto {
  @ApiProperty({ description: 'Campaign name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Campaign description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Campaign goal', enum: CampaignGoal })
  @IsEnum(CampaignGoal)
  goal: CampaignGoal;

  @ApiProperty({ description: 'Campaign type', enum: CampaignType })
  @IsEnum(CampaignType)
  type: CampaignType;

  @ApiProperty({ description: 'Brand ID' })
  @IsUUID()
  brandId: string;

  @ApiPropertyOptional({ description: 'Client ID' })
  @IsOptional()
  @IsUUID()
  clientId?: string;

  @ApiPropertyOptional({ description: 'Template ID' })
  @IsOptional()
  @IsUUID()
  templateId?: string;

  @ApiPropertyOptional({ description: 'Campaign start date' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'Campaign end date' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ description: 'Campaign budget' })
  @IsOptional()
  @IsNumber()
  budget?: number;

  @ApiPropertyOptional({ description: 'Target audience data' })
  @IsOptional()
  @IsObject()
  targetAudience?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Campaign content structure' })
  @IsOptional()
  @IsObject()
  content?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Asset IDs' })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  assetIds?: string[];
}

export class UpdateCampaignDto {
  @ApiPropertyOptional({ description: 'Campaign name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Campaign description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Campaign goal', enum: CampaignGoal })
  @IsOptional()
  @IsEnum(CampaignGoal)
  goal?: CampaignGoal;

  @ApiPropertyOptional({ description: 'Campaign type', enum: CampaignType })
  @IsOptional()
  @IsEnum(CampaignType)
  type?: CampaignType;

  @ApiPropertyOptional({ description: 'Campaign status', enum: CampaignStatus })
  @IsOptional()
  @IsEnum(CampaignStatus)
  status?: CampaignStatus;

  @ApiPropertyOptional({ description: 'Campaign start date' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'Campaign end date' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ description: 'Campaign budget' })
  @IsOptional()
  @IsNumber()
  budget?: number;

  @ApiPropertyOptional({ description: 'Target audience data' })
  @IsOptional()
  @IsObject()
  targetAudience?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Campaign content structure' })
  @IsOptional()
  @IsObject()
  content?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Asset IDs' })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  assetIds?: string[];
}

export class GenerateCampaignDto {
  @ApiProperty({ description: 'Client name' })
  @IsString()
  clientName: string;

  @ApiProperty({ description: 'Business type/industry' })
  @IsString()
  businessType: string;

  @ApiProperty({ description: 'Target audience/buyer persona' })
  @IsString()
  targetAudience: string;

  @ApiProperty({ description: 'Primary goal', enum: CampaignGoal })
  @IsEnum(CampaignGoal)
  primaryGoal: CampaignGoal;

  @ApiPropertyOptional({ description: 'Additional goals' })
  @IsOptional()
  @IsArray()
  @IsEnum(CampaignGoal, { each: true })
  additionalGoals?: CampaignGoal[];

  @ApiProperty({ description: 'Budget range', enum: ['LOW', 'MEDIUM', 'HIGH'] })
  @IsEnum(['LOW', 'MEDIUM', 'HIGH'])
  budgetRange: 'LOW' | 'MEDIUM' | 'HIGH';

  @ApiPropertyOptional({ description: 'Preferred platforms' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredPlatforms?: string[];

  @ApiProperty({ description: 'Campaign timeline' })
  @IsString()
  timeline: string;

  @ApiPropertyOptional({ description: 'Existing campaigns or assets' })
  @IsOptional()
  @IsString()
  existingAssets?: string;

  @ApiPropertyOptional({ description: 'Brand ID' })
  @IsOptional()
  @IsUUID()
  brandId?: string;

  @ApiPropertyOptional({ description: 'Additional context' })
  @IsOptional()
  @IsObject()
  additionalContext?: Record<string, any>;
}

export class CampaignTemplateDto {
  @ApiProperty({ description: 'Template name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Template description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Campaign type', enum: CampaignType })
  @IsEnum(CampaignType)
  type: CampaignType;

  @ApiProperty({ description: 'Campaign goal', enum: CampaignGoal })
  @IsEnum(CampaignGoal)
  goal: CampaignGoal;

  @ApiPropertyOptional({ description: 'Template category' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ description: 'Template structure' })
  @IsObject()
  structure: Record<string, any>;

  @ApiProperty({ description: 'Default content and copy' })
  @IsObject()
  content: Record<string, any>;

  @ApiProperty({ description: 'Required assets' })
  @IsObject()
  assets: Record<string, any>;

  @ApiProperty({ description: 'Platform-specific settings' })
  @IsObject()
  settings: Record<string, any>;

  @ApiPropertyOptional({ description: 'Whether template is active', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CampaignKpiDto {
  @ApiProperty({ description: 'KPI metric name' })
  @IsString()
  metric: string;

  @ApiProperty({ description: 'KPI value' })
  @IsNumber()
  value: number;

  @ApiPropertyOptional({ description: 'Target value' })
  @IsOptional()
  @IsNumber()
  target?: number;

  @ApiProperty({ description: 'Unit of measurement' })
  @IsString()
  unit: string;

  @ApiProperty({ description: 'Date of measurement' })
  @IsDateString()
  date: string;

  @ApiPropertyOptional({ description: 'Data source' })
  @IsOptional()
  @IsString()
  source?: string;
}

export class CampaignAnalyticsDto {
  @ApiProperty({ description: 'Date of analytics' })
  @IsDateString()
  date: string;

  @ApiPropertyOptional({ description: 'Platform name' })
  @IsOptional()
  @IsString()
  platform?: string;

  @ApiPropertyOptional({ description: 'Impressions count' })
  @IsOptional()
  @IsNumber()
  impressions?: number;

  @ApiPropertyOptional({ description: 'Clicks count' })
  @IsOptional()
  @IsNumber()
  clicks?: number;

  @ApiPropertyOptional({ description: 'Conversions count' })
  @IsOptional()
  @IsNumber()
  conversions?: number;

  @ApiPropertyOptional({ description: 'Spend amount' })
  @IsOptional()
  @IsNumber()
  spend?: number;

  @ApiPropertyOptional({ description: 'Revenue amount' })
  @IsOptional()
  @IsNumber()
  revenue?: number;

  @ApiPropertyOptional({ description: 'Click-through rate' })
  @IsOptional()
  @IsNumber()
  ctr?: number;

  @ApiPropertyOptional({ description: 'Cost per click' })
  @IsOptional()
  @IsNumber()
  cpc?: number;

  @ApiPropertyOptional({ description: 'Cost per acquisition' })
  @IsOptional()
  @IsOptional()
  @IsNumber()
  cpa?: number;

  @ApiPropertyOptional({ description: 'Return on investment' })
  @IsOptional()
  @IsNumber()
  roi?: number;

  @ApiPropertyOptional({ description: 'Engagement metrics' })
  @IsOptional()
  @IsObject()
  engagement?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Demographics data' })
  @IsOptional()
  @IsObject()
  demographics?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Geographic data' })
  @IsOptional()
  @IsObject()
  geographic?: Record<string, any>;
}
