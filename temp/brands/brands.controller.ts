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
import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brands.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('brands')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiResponse({ status: 201, description: 'Brand created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createBrand(
    @Body() createBrandDto: CreateBrandDto,
    @Request() req: any,
  ) {
    return this.brandsService.createBrand(createBrandDto, req.user.tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all brands with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiResponse({ status: 200, description: 'Brands retrieved successfully' })
  async getBrands(
    @Query() pagination: PaginationDto,
    @Request() req: any,
  ) {
    return this.brandsService.getBrands(req.user.tenantId, pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific brand' })
  @ApiParam({ name: 'id', description: 'Brand ID' })
  @ApiResponse({ status: 200, description: 'Brand retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  async getBrand(@Param('id') id: string, @Request() req: any) {
    return this.brandsService.getBrand(id, req.user.tenantId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a brand' })
  @ApiParam({ name: 'id', description: 'Brand ID' })
  @ApiResponse({ status: 200, description: 'Brand updated successfully' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  async updateBrand(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @Request() req: any,
  ) {
    return this.brandsService.updateBrand(id, updateBrandDto, req.user.tenantId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a brand' })
  @ApiParam({ name: 'id', description: 'Brand ID' })
  @ApiResponse({ status: 200, description: 'Brand deleted successfully' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  @ApiResponse({ status: 400, description: 'Cannot delete brand with associated projects' })
  async deleteBrand(@Param('id') id: string, @Request() req: any) {
    return this.brandsService.deleteBrand(id, req.user.tenantId);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get brand statistics' })
  @ApiParam({ name: 'id', description: 'Brand ID' })
  @ApiResponse({ status: 200, description: 'Brand statistics retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  async getBrandStats(@Param('id') id: string, @Request() req: any) {
    return this.brandsService.getBrandStats(id, req.user.tenantId);
  }
}
