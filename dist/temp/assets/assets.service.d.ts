import { PrismaService } from '../common/prisma.service';
import { CreateAssetDto, UpdateAssetDto, AssetSearchDto, BatchAssetOperationDto } from './dto/assets.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class AssetsService {
    private prisma;
    constructor(prisma: PrismaService);
    createAsset(createAssetDto: CreateAssetDto, userId: string, tenantId: string): Promise<any>;
    getAssets(pagination: PaginationDto, tenantId: string): Promise<{
        data: any;
        meta: {
            page: PaginationDto;
            limit: PaginationDto;
            total: any;
            totalPages: number;
        };
    }>;
    searchAssets(searchDto: AssetSearchDto, tenantId: string): Promise<any>;
    getAsset(id: string, tenantId: string): Promise<any>;
    updateAsset(id: string, updateAssetDto: UpdateAssetDto, tenantId: string): Promise<any>;
    deleteAsset(id: string, tenantId: string): Promise<{
        message: string;
    }>;
    batchOperation(batchDto: BatchAssetOperationDto, tenantId: string): Promise<{
        message: string;
    }>;
    getAssetOptimizations(assetId: string, tenantId: string): Promise<any>;
    generateOptimizations(assetId: string, tenantId: string): Promise<any[]>;
    private analyzeAsset;
    private processOptimizations;
}
