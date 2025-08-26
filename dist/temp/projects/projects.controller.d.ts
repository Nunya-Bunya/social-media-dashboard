import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from '../assets/dto/assets.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto, req: any): Promise<any>;
    findAll(pagination: PaginationDto, req: any): Promise<{
        data: any;
        meta: {
            page: PaginationDto;
            limit: PaginationDto;
            total: any;
            totalPages: number;
        };
    }>;
    findOne(id: string, req: any): Promise<any>;
    getProjectAssets(id: string, req: any): Promise<any>;
    getProjectStats(id: string, req: any): Promise<{
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
    update(id: string, updateProjectDto: UpdateProjectDto, req: any): Promise<any>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
