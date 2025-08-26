import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsUUID, IsBoolean, IsObject } from 'class-validator';
import { TemplateType } from '@prisma/client';

export class CreateTemplateDto {
  @ApiProperty({ description: 'Template name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Template description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Template type', enum: TemplateType })
  @IsEnum(TemplateType)
  type: TemplateType;

  @ApiProperty({ description: 'Brand ID' })
  @IsUUID()
  brandId: string;

  @ApiPropertyOptional({ description: 'Template metadata' })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Whether template is active', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateTemplateDto {
  @ApiPropertyOptional({ description: 'Template name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Template description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Template type', enum: TemplateType })
  @IsOptional()
  @IsEnum(TemplateType)
  type?: TemplateType;

  @ApiPropertyOptional({ description: 'Brand ID' })
  @IsOptional()
  @IsUUID()
  brandId?: string;

  @ApiPropertyOptional({ description: 'Template metadata' })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Whether template is active' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
