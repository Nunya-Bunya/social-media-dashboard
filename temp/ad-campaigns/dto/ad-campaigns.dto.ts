import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsUUID, IsObject, IsDateString, IsNumber, IsArray, IsBoolean, IsUrl } from 'class-validator';
import { AdPlatform, AdStatus, AdType, CreativeType, TestStatus, TestVariant, FunnelStatus } from '@prisma/client';

export class CreateAdCampaignDto {
  @ApiProperty({ description: 'Campaign name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Campaign description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Ad platform', enum: AdPlatform })
  @IsEnum(AdPlatform)
  platform: AdPlatform;

  @ApiProperty({ description: 'Ad type', enum: AdType })
  @IsEnum(AdType)
  adType: AdType;

  @ApiProperty({ description: 'Campaign budget' })
  @IsNumber()
  budget: number;

  @ApiPropertyOptional({ description: 'Daily budget limit' })
  @IsOptional()
  @IsNumber()
  dailyBudget?: number;

  @ApiPropertyOptional({ description: 'Targeting options' })
  @IsOptional()
  @IsObject()
  targeting?: Record<string, any>;

  @ApiProperty({ description: 'Brand ID' })
  @IsUUID()
  brandId: string;

  @ApiPropertyOptional({ description: 'Client ID' })
  @IsOptional()
  @IsUUID()
  clientId?: string;

  @ApiPropertyOptional({ description: 'Campaign start date' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'Campaign end date' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class UpdateAdCampaignDto {
  @ApiPropertyOptional({ description: 'Campaign name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Campaign description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Ad platform', enum: AdPlatform })
  @IsOptional()
  @IsEnum(AdPlatform)
  platform?: AdPlatform;

  @ApiPropertyOptional({ description: 'Ad type', enum: AdType })
  @IsOptional()
  @IsEnum(AdType)
  adType?: AdType;

  @ApiPropertyOptional({ description: 'Campaign status', enum: AdStatus })
  @IsOptional()
  @IsEnum(AdStatus)
  status?: AdStatus;

  @ApiPropertyOptional({ description: 'Campaign budget' })
  @IsOptional()
  @IsNumber()
  budget?: number;

  @ApiPropertyOptional({ description: 'Daily budget limit' })
  @IsOptional()
  @IsNumber()
  dailyBudget?: number;

  @ApiPropertyOptional({ description: 'Targeting options' })
  @IsOptional()
  @IsObject()
  targeting?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Campaign start date' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'Campaign end date' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class CreateAdCreativeDto {
  @ApiProperty({ description: 'Creative name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Creative type', enum: CreativeType })
  @IsEnum(CreativeType)
  type: CreativeType;

  @ApiProperty({ description: 'Ad platform', enum: AdPlatform })
  @IsEnum(AdPlatform)
  platform: AdPlatform;

  @ApiPropertyOptional({ description: 'Ad campaign ID' })
  @IsOptional()
  @IsUUID()
  adCampaignId?: string;

  @ApiProperty({ description: 'Brand ID' })
  @IsUUID()
  brandId: string;

  @ApiProperty({ description: 'Media URL' })
  @IsUrl()
  mediaUrl: string;

  @ApiPropertyOptional({ description: 'Thumbnail URL' })
  @IsOptional()
  @IsUrl()
  thumbnailUrl?: string;

  @ApiPropertyOptional({ description: 'Ad copy content' })
  @IsOptional()
  @IsObject()
  adCopy?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Media dimensions' })
  @IsOptional()
  @IsObject()
  dimensions?: Record<string, any>;

  @ApiPropertyOptional({ description: 'File size in bytes' })
  @IsOptional()
  @IsNumber()
  fileSize?: number;

  @ApiPropertyOptional({ description: 'Video duration in seconds' })
  @IsOptional()
  @IsNumber()
  duration?: number;
}

export class UpdateAdCreativeDto {
  @ApiPropertyOptional({ description: 'Creative name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Creative type', enum: CreativeType })
  @IsOptional()
  @IsEnum(CreativeType)
  type?: CreativeType;

  @ApiPropertyOptional({ description: 'Ad platform', enum: AdPlatform })
  @IsOptional()
  @IsEnum(AdPlatform)
  platform?: AdPlatform;

  @ApiPropertyOptional({ description: 'Media URL' })
  @IsOptional()
  @IsUrl()
  mediaUrl?: string;

  @ApiPropertyOptional({ description: 'Thumbnail URL' })
  @IsOptional()
  @IsUrl()
  thumbnailUrl?: string;

  @ApiPropertyOptional({ description: 'Ad copy content' })
  @IsOptional()
  @IsObject()
  adCopy?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Media dimensions' })
  @IsOptional()
  @IsObject()
  dimensions?: Record<string, any>;

  @ApiPropertyOptional({ description: 'File size in bytes' })
  @IsOptional()
  @IsNumber()
  fileSize?: number;

  @ApiPropertyOptional({ description: 'Video duration in seconds' })
  @IsOptional()
  @IsNumber()
  duration?: number;
}

export class TrackAdAnalyticsDto {
  @ApiProperty({ description: 'Date of analytics' })
  @IsDateString()
  date: string;

  @ApiProperty({ description: 'Number of impressions' })
  @IsNumber()
  impressions: number;

  @ApiProperty({ description: 'Number of clicks' })
  @IsNumber()
  clicks: number;

  @ApiPropertyOptional({ description: 'Number of conversions' })
  @IsOptional()
  @IsNumber()
  conversions?: number;

  @ApiProperty({ description: 'Amount spent' })
  @IsNumber()
  spend: number;

  @ApiPropertyOptional({ description: 'Revenue generated' })
  @IsOptional()
  @IsNumber()
  revenue?: number;

  @ApiProperty({ description: 'Click-through rate' })
  @IsNumber()
  ctr: number;

  @ApiProperty({ description: 'Cost per click' })
  @IsNumber()
  cpc: number;

  @ApiPropertyOptional({ description: 'Cost per acquisition' })
  @IsOptional()
  @IsNumber()
  cpa?: number;

  @ApiPropertyOptional({ description: 'Return on investment' })
  @IsOptional()
  @IsNumber()
  roi?: number;

  @ApiPropertyOptional({ description: 'Reach count' })
  @IsOptional()
  @IsNumber()
  reach?: number;

  @ApiPropertyOptional({ description: 'Frequency' })
  @IsOptional()
  @IsNumber()
  frequency?: number;

  @ApiPropertyOptional({ description: 'Quality score' })
  @IsOptional()
  @IsNumber()
  qualityScore?: number;
}

export class CreateSplitTestDto {
  @ApiProperty({ description: 'Test name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Test description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Ad campaign ID' })
  @IsUUID()
  adCampaignId: string;

  @ApiProperty({ description: 'Variant A configuration' })
  @IsObject()
  variantA: Record<string, any>;

  @ApiProperty({ description: 'Variant B configuration' })
  @IsObject()
  variantB: Record<string, any>;

  @ApiProperty({ description: 'Test start date' })
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({ description: 'Test end date' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ description: 'Required sample size' })
  @IsNumber()
  sampleSize: number;
}

export class UpdateSplitTestDto {
  @ApiPropertyOptional({ description: 'Test name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Test description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Test status', enum: TestStatus })
  @IsOptional()
  @IsEnum(TestStatus)
  status?: TestStatus;

  @ApiPropertyOptional({ description: 'Variant A configuration' })
  @IsOptional()
  @IsObject()
  variantA?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Variant B configuration' })
  @IsOptional()
  @IsObject()
  variantB?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Test end date' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ description: 'Winning variant', enum: TestVariant })
  @IsOptional()
  @IsEnum(TestVariant)
  winner?: TestVariant;
}

export class CreateSalesFunnelDto {
  @ApiProperty({ description: 'Funnel name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Funnel description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Client ID' })
  @IsOptional()
  @IsUUID()
  clientId?: string;

  @ApiProperty({ description: 'Funnel steps configuration' })
  @IsObject()
  steps: Record<string, any>;

  @ApiPropertyOptional({ description: 'Conversion rates data' })
  @IsOptional()
  @IsObject()
  conversionRates?: Record<string, any>;
}

export class UpdateSalesFunnelDto {
  @ApiPropertyOptional({ description: 'Funnel name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Funnel description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Funnel status', enum: FunnelStatus })
  @IsOptional()
  @IsEnum(FunnelStatus)
  status?: FunnelStatus;

  @ApiPropertyOptional({ description: 'Funnel steps configuration' })
  @IsOptional()
  @IsObject()
  steps?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Conversion rates data' })
  @IsOptional()
  @IsObject()
  conversionRates?: Record<string, any>;
}

export class CreateIntegrationDto {
  @ApiProperty({ description: 'Platform name' })
  @IsString()
  platform: string;

  @ApiProperty({ description: 'Integration name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'API key' })
  @IsOptional()
  @IsString()
  apiKey?: string;

  @ApiPropertyOptional({ description: 'API secret' })
  @IsOptional()
  @IsString()
  apiSecret?: string;

  @ApiPropertyOptional({ description: 'Access token' })
  @IsOptional()
  @IsString()
  accessToken?: string;

  @ApiPropertyOptional({ description: 'Refresh token' })
  @IsOptional()
  @IsString()
  refreshToken?: string;

  @ApiPropertyOptional({ description: 'Integration settings' })
  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Whether integration is active', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateIntegrationDto {
  @ApiPropertyOptional({ description: 'Integration name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'API key' })
  @IsOptional()
  @IsString()
  apiKey?: string;

  @ApiPropertyOptional({ description: 'API secret' })
  @IsOptional()
  @IsString()
  apiSecret?: string;

  @ApiPropertyOptional({ description: 'Access token' })
  @IsOptional()
  @IsString()
  accessToken?: string;

  @ApiPropertyOptional({ description: 'Refresh token' })
  @IsOptional()
  @IsString()
  refreshToken?: string;

  @ApiPropertyOptional({ description: 'Integration settings' })
  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Whether integration is active' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class AnalyticsOverviewDto {
  @ApiProperty({ description: 'Date range start' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'Date range end' })
  @IsDateString()
  endDate: string;

  @ApiPropertyOptional({ description: 'Platform filter' })
  @IsOptional()
  @IsEnum(AdPlatform)
  platform?: AdPlatform;

  @ApiPropertyOptional({ description: 'Client ID filter' })
  @IsOptional()
  @IsUUID()
  clientId?: string;

  @ApiPropertyOptional({ description: 'Brand ID filter' })
  @IsOptional()
  @IsUUID()
  brandId?: string;
}

export class SyncAnalyticsDto {
  @ApiProperty({ description: 'Platform to sync' })
  @IsEnum(AdPlatform)
  platform: AdPlatform;

  @ApiPropertyOptional({ description: 'Campaign ID to sync' })
  @IsOptional()
  @IsUUID()
  campaignId?: string;

  @ApiPropertyOptional({ description: 'Date range start' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'Date range end' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
