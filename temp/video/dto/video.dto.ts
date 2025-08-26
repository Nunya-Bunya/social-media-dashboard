import { IsString, IsOptional, IsUUID, IsEnum, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVideoProjectDto {
  @ApiProperty({ description: 'Brand ID for the project' })
  @IsUUID()
  brandId: string;

  @ApiPropertyOptional({ description: 'Template ID for the project' })
  @IsOptional()
  @IsUUID()
  templateId?: string;

  @ApiPropertyOptional({ description: 'Video script content' })
  @IsOptional()
  @IsString()
  script?: string;

  @ApiPropertyOptional({ description: 'Project properties and settings' })
  @IsOptional()
  @IsObject()
  properties?: any;
}

export class UpdateVideoProjectDto {
  @ApiPropertyOptional({ description: 'Template ID for the project' })
  @IsOptional()
  @IsUUID()
  templateId?: string;

  @ApiPropertyOptional({ description: 'Video script content' })
  @IsOptional()
  @IsString()
  script?: string;

  @ApiPropertyOptional({ description: 'Project properties and settings' })
  @IsOptional()
  @IsObject()
  properties?: any;
}

export class CreateVideoVariantDto {
  @ApiProperty({ enum: ['_9x16', '_1x1', '_16x9'], description: 'Video aspect ratio' })
  @IsEnum(['_9x16', '_1x1', '_16x9'])
  aspect: string;
}

export class RenderVideoDto {
  @ApiProperty({ description: 'Video aspect ratio to render' })
  @IsEnum(['_9x16', '_1x1', '_16x9'])
  aspect: string;

  @ApiPropertyOptional({ description: 'Output format for the video' })
  @IsOptional()
  @IsString()
  outputFormat?: string;

  @ApiPropertyOptional({ description: 'Render properties and settings' })
  @IsOptional()
  @IsObject()
  properties?: any;
}
