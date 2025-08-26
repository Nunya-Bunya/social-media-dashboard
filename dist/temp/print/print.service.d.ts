import { PrismaService } from '../common/prisma.service';
import { CreatePrintProjectDto, UpdatePrintProjectDto } from './dto/print.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';
export declare class PrintService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createProject(createProjectDto: CreatePrintProjectDto, tenantId: string): Promise<any>;
    getProjects(tenantId: string, pagination: PaginationDto): Promise<PaginatedResponseDto<any>>;
    getProject(id: string, tenantId: string): Promise<any>;
    updateProject(id: string, updateProjectDto: UpdatePrintProjectDto, tenantId: string): Promise<any>;
    deleteProject(id: string, tenantId: string): Promise<{
        message: string;
    }>;
    createVariant(projectId: string, aspect: string, tenantId: string): Promise<any>;
    getProjectStats(tenantId: string): Promise<{
        totalProjects: any;
        statusBreakdown: any;
        brandBreakdown: any;
    }>;
}
