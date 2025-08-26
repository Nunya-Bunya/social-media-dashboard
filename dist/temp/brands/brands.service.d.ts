import { PrismaService } from '../common/prisma.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brands.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';
export declare class BrandsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createBrand(createBrandDto: CreateBrandDto, tenantId: string): Promise<any>;
    getBrands(tenantId: string, pagination: PaginationDto): Promise<PaginatedResponseDto<any>>;
    getBrand(id: string, tenantId: string): Promise<any>;
    updateBrand(id: string, updateBrandDto: UpdateBrandDto, tenantId: string): Promise<any>;
    deleteBrand(id: string, tenantId: string): Promise<{
        message: string;
    }>;
    getBrandStats(id: string, tenantId: string): Promise<{
        brandId: string;
        videoProjects: {
            total: any;
            byStatus: any;
        };
        printProjects: {
            total: any;
            byStatus: any;
        };
        templates: {
            total: any;
            byType: any;
        };
    }>;
}
