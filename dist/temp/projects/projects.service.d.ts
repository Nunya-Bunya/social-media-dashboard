import { PrismaService } from '../common/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from '../assets/dto/assets.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    createProject(createProjectDto: CreateProjectDto, userId: string, tenantId: string): Promise<any>;
    getProjects(pagination: PaginationDto, tenantId: string): Promise<{
        data: any;
        meta: {
            page: PaginationDto;
            limit: PaginationDto;
            total: any;
            totalPages: number;
        };
    }>;
    getProject(id: string, tenantId: string): Promise<any>;
    updateProject(id: string, updateProjectDto: UpdateProjectDto, tenantId: string): Promise<any>;
    deleteProject(id: string, tenantId: string): Promise<{
        message: string;
    }>;
    getProjectAssets(id: string, tenantId: string): Promise<any>;
    getProjectStats(id: string, tenantId: string): Promise<{
        projectId: string;
        totalAssets: any;
        totalDeployments: any;
        assetsByType: any;
        assetsByStatus: any;
        timeline: {
            startDate: any;
            endDate: any;
            status: any;
        };
    }>;
}
