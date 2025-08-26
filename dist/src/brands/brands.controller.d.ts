import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brands.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class BrandsController {
    private readonly brandsService;
    constructor(brandsService: BrandsService);
    createBrand(createBrandDto: CreateBrandDto, req: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        website: string | null;
        logoUrl: string | null;
        palette: import("@prisma/client/runtime/library").JsonValue | null;
        fonts: import("@prisma/client/runtime/library").JsonValue | null;
        createdBy: string;
    }>;
    getBrands(pagination: PaginationDto, req: any): Promise<import("../common/dto/pagination.dto").PaginatedResponseDto<any>>;
    getBrand(id: string, req: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        website: string | null;
        logoUrl: string | null;
        palette: import("@prisma/client/runtime/library").JsonValue | null;
        fonts: import("@prisma/client/runtime/library").JsonValue | null;
        createdBy: string;
    }>;
    updateBrand(id: string, updateBrandDto: UpdateBrandDto, req: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        website: string | null;
        logoUrl: string | null;
        palette: import("@prisma/client/runtime/library").JsonValue | null;
        fonts: import("@prisma/client/runtime/library").JsonValue | null;
        createdBy: string;
    }>;
    deleteBrand(id: string, req: any): Promise<{
        message: string;
    }>;
    getBrandStats(id: string, req: any): Promise<{
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
