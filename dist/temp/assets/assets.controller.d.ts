import { AssetsService } from './assets.service';
import { CreateAssetDto, UpdateAssetDto, AssetSearchDto, BatchAssetOperationDto } from './dto/assets.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class AssetsController {
    private readonly assetsService;
    constructor(assetsService: AssetsService);
    create(createAssetDto: CreateAssetDto, req: any): Promise<any>;
    uploadAsset(file: Express.Multer.File, assetData: any, req: any): Promise<any>;
    findAll(pagination: PaginationDto, req: any): Promise<{
        data: any;
        meta: {
            page: PaginationDto;
            limit: PaginationDto;
            total: any;
            totalPages: number;
        };
    }>;
    search(searchDto: AssetSearchDto, req: any): Promise<any>;
    findOne(id: string, req: any): Promise<any>;
    getOptimizations(id: string, req: any): Promise<any>;
    generateOptimizations(id: string, req: any): Promise<any[]>;
    update(id: string, updateAssetDto: UpdateAssetDto, req: any): Promise<any>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
    batchOperation(batchDto: BatchAssetOperationDto, req: any): Promise<{
        message: string;
    }>;
}
