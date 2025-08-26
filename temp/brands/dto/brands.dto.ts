import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl, IsHexColor } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ description: 'Brand name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Brand description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Brand logo URL' })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiPropertyOptional({ description: 'Brand website URL' })
  @IsOptional()
  @IsUrl()
  websiteUrl?: string;

  @ApiPropertyOptional({ description: 'Primary brand color (hex)' })
  @IsOptional()
  @IsHexColor()
  primaryColor?: string;

  @ApiPropertyOptional({ description: 'Secondary brand color (hex)' })
  @IsOptional()
  @IsHexColor()
  secondaryColor?: string;

  @ApiPropertyOptional({ description: 'Brand tagline' })
  @IsOptional()
  @IsString()
  tagline?: string;

  @ApiPropertyOptional({ description: 'Brand industry/category' })
  @IsOptional()
  @IsString()
  industry?: string;
}

export class UpdateBrandDto {
  @ApiPropertyOptional({ description: 'Brand name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Brand description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Brand logo URL' })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiPropertyOptional({ description: 'Brand website URL' })
  @IsOptional()
  @IsUrl()
  websiteUrl?: string;

  @ApiPropertyOptional({ description: 'Primary brand color (hex)' })
  @IsOptional()
  @IsHexColor()
  primaryColor?: string;

  @ApiPropertyOptional({ description: 'Secondary brand color (hex)' })
  @IsOptional()
  @IsHexColor()
  secondaryColor?: string;

  @ApiPropertyOptional({ description: 'Brand tagline' })
  @IsOptional()
  @IsString()
  tagline?: string;

  @ApiPropertyOptional({ description: 'Brand industry/category' })
  @IsOptional()
  @IsString()
  industry?: string;
}
