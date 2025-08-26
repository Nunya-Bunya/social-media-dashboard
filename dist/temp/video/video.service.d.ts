import { PrismaService } from '../common/prisma.service';
import { CreateVideoProjectDto, UpdateVideoProjectDto } from './dto/video.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';
export declare class VideoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createProject(createDto: CreateVideoProjectDto, tenantId: string): Promise<any>;
    getProjects(tenantId: string, pagination: PaginationDto): Promise<PaginatedResponseDto<any>>;
    getProject(id: string, tenantId: string): Promise<any>;
    updateProject(id: string, updateDto: UpdateVideoProjectDto, tenantId: string): Promise<any>;
    deleteProject(id: string, tenantId: string): Promise<void>;
    createVariant(projectId: string, aspect: string, tenantId: string): Promise<any>;
}
