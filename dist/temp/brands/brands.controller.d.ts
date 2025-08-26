import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brands.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class BrandsController {
    private readonly brandsService;
    constructor(brandsService: BrandsService);
    createBrand(createBrandDto: CreateBrandDto, req: any): Promise<any>;
    getBrands(pagination: PaginationDto, req: any): Promise<PaginatedResponseDto<any>>;
    getBrand(id: string, req: any): Promise<any>;
    updateBrand(id: string, updateBrandDto: UpdateBrandDto, req: any): Promise<any>;
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
