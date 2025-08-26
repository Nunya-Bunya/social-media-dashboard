import { AIAssistantsService } from './ai-assistants.service';
import { CreateAIAssistantDto, UpdateAIAssistantDto, CreateChatSessionDto, SendMessageDto, CreateBusinessDocumentDto, UpdateBusinessDocumentDto, CreateAITaskDto, UpdateAITaskDto, GenerateContentDto, GlobalSearchDto } from './dto/ai-assistants.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class AIAssistantsController {
    private readonly aiAssistantsService;
    constructor(aiAssistantsService: AIAssistantsService);
    create(createDto: CreateAIAssistantDto, req: any): Promise<{
        brand: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string;
            tenantId: string;
            website: string | null;
            logoUrl: string | null;
            palette: import("@prisma/client/runtime/library").JsonValue | null;
            fonts: import("@prisma/client/runtime/library").JsonValue | null;
        };
        client: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            email: string;
            company: string | null;
            industry: string | null;
            targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
            budget: number | null;
            goals: import("@prisma/client/runtime/library").JsonValue | null;
        };
        creator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
        description: string | null;
        id: string;
        name: string;
        businessType: string;
        prompt: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        brandId: string | null;
        clientId: string | null;
        createdBy: string;
        tenantId: string;
    }>;
    findAll(pagination: PaginationDto, req: any): Promise<{
        data: ({
            brand: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                createdBy: string;
                tenantId: string;
                website: string | null;
                logoUrl: string | null;
                palette: import("@prisma/client/runtime/library").JsonValue | null;
                fonts: import("@prisma/client/runtime/library").JsonValue | null;
            };
            client: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                tenantId: string;
                email: string;
                company: string | null;
                industry: string | null;
                targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                budget: number | null;
                goals: import("@prisma/client/runtime/library").JsonValue | null;
            };
            creator: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                tenantId: string;
                email: string;
                password: string;
                role: import(".prisma/client").$Enums.Role;
            };
            _count: {
                chatSessions: number;
                businessDocuments: number;
                aiTasks: number;
            };
        } & {
            description: string | null;
            id: string;
            name: string;
            businessType: string;
            prompt: string;
            settings: import("@prisma/client/runtime/library").JsonValue | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            brandId: string | null;
            clientId: string | null;
            createdBy: string;
            tenantId: string;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string, req: any): Promise<{
        brand: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string;
            tenantId: string;
            website: string | null;
            logoUrl: string | null;
            palette: import("@prisma/client/runtime/library").JsonValue | null;
            fonts: import("@prisma/client/runtime/library").JsonValue | null;
        };
        client: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            email: string;
            company: string | null;
            industry: string | null;
            targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
            budget: number | null;
            goals: import("@prisma/client/runtime/library").JsonValue | null;
        };
        creator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
        };
        chatSessions: ({
            messages: {
                content: string;
                id: string;
                createdAt: Date;
                role: import(".prisma/client").$Enums.ChatMessageRole;
                sessionId: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            title: string | null;
            assistantId: string;
            userId: string;
        })[];
        businessDocuments: {
            content: string | null;
            type: string;
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            assistantId: string;
            fileUrl: string | null;
            fileSize: number | null;
        }[];
        aiTasks: {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            title: string;
            assistantId: string;
            userId: string;
            status: import(".prisma/client").$Enums.TaskStatus;
            priority: import(".prisma/client").$Enums.TaskPriority;
            dueDate: Date | null;
            completedAt: Date | null;
        }[];
    } & {
        description: string | null;
        id: string;
        name: string;
        businessType: string;
        prompt: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        brandId: string | null;
        clientId: string | null;
        createdBy: string;
        tenantId: string;
    }>;
    update(id: string, updateDto: UpdateAIAssistantDto, req: any): Promise<{
        brand: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string;
            tenantId: string;
            website: string | null;
            logoUrl: string | null;
            palette: import("@prisma/client/runtime/library").JsonValue | null;
            fonts: import("@prisma/client/runtime/library").JsonValue | null;
        };
        client: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            email: string;
            company: string | null;
            industry: string | null;
            targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
            budget: number | null;
            goals: import("@prisma/client/runtime/library").JsonValue | null;
        };
        creator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
        description: string | null;
        id: string;
        name: string;
        businessType: string;
        prompt: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        brandId: string | null;
        clientId: string | null;
        createdBy: string;
        tenantId: string;
    }>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
    createChatSession(createDto: CreateChatSessionDto, req: any): Promise<{
        assistant: {
            description: string | null;
            id: string;
            name: string;
            businessType: string;
            prompt: string;
            settings: import("@prisma/client/runtime/library").JsonValue | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            brandId: string | null;
            clientId: string | null;
            createdBy: string;
            tenantId: string;
        };
        messages: {
            content: string;
            id: string;
            createdAt: Date;
            role: import(".prisma/client").$Enums.ChatMessageRole;
            sessionId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        title: string | null;
        assistantId: string;
        userId: string;
    }>;
    getChatSessions(assistantId: string, req: any): Promise<({
        messages: {
            content: string;
            id: string;
            createdAt: Date;
            role: import(".prisma/client").$Enums.ChatMessageRole;
            sessionId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        title: string | null;
        assistantId: string;
        userId: string;
    })[]>;
    getChatSession(id: string, req: any): Promise<{
        assistant: {
            description: string | null;
            id: string;
            name: string;
            businessType: string;
            prompt: string;
            settings: import("@prisma/client/runtime/library").JsonValue | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            brandId: string | null;
            clientId: string | null;
            createdBy: string;
            tenantId: string;
        };
        messages: {
            content: string;
            id: string;
            createdAt: Date;
            role: import(".prisma/client").$Enums.ChatMessageRole;
            sessionId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        title: string | null;
        assistantId: string;
        userId: string;
    }>;
    sendMessage(sendDto: SendMessageDto, req: any): Promise<{
        userMessage: {
            content: string;
            id: string;
            createdAt: Date;
            role: import(".prisma/client").$Enums.ChatMessageRole;
            sessionId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
        };
        assistantMessage: {
            content: string;
            id: string;
            createdAt: Date;
            role: import(".prisma/client").$Enums.ChatMessageRole;
            sessionId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
        };
    }>;
    createBusinessDocument(createDto: CreateBusinessDocumentDto, req: any): Promise<{
        content: string | null;
        type: string;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        assistantId: string;
        fileUrl: string | null;
        fileSize: number | null;
    }>;
    getBusinessDocuments(assistantId: string, req: any): Promise<{
        content: string | null;
        type: string;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        assistantId: string;
        fileUrl: string | null;
        fileSize: number | null;
    }[]>;
    updateBusinessDocument(id: string, updateDto: UpdateBusinessDocumentDto, req: any): Promise<{
        content: string | null;
        type: string;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        assistantId: string;
        fileUrl: string | null;
        fileSize: number | null;
    }>;
    deleteBusinessDocument(id: string, req: any): Promise<{
        message: string;
    }>;
    createAITask(createDto: CreateAITaskDto, req: any): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        title: string;
        assistantId: string;
        userId: string;
        status: import(".prisma/client").$Enums.TaskStatus;
        priority: import(".prisma/client").$Enums.TaskPriority;
        dueDate: Date | null;
        completedAt: Date | null;
    }>;
    getAITasks(assistantId: string, req: any): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        title: string;
        assistantId: string;
        userId: string;
        status: import(".prisma/client").$Enums.TaskStatus;
        priority: import(".prisma/client").$Enums.TaskPriority;
        dueDate: Date | null;
        completedAt: Date | null;
    }[]>;
    updateAITask(id: string, updateDto: UpdateAITaskDto, req: any): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        title: string;
        assistantId: string;
        userId: string;
        status: import(".prisma/client").$Enums.TaskStatus;
        priority: import(".prisma/client").$Enums.TaskPriority;
        dueDate: Date | null;
        completedAt: Date | null;
    }>;
    deleteAITask(id: string, req: any): Promise<{
        message: string;
    }>;
    generateContent(generateDto: GenerateContentDto, req: any): Promise<{
        type: import("./dto/ai-assistants.dto").ContentType;
        content: string;
        generatedAt: Date;
    }>;
    globalSearch(searchDto: GlobalSearchDto, req: any): Promise<{
        assistants: any[];
        chatSessions: any[];
        documents: any[];
        tasks: any[];
    }>;
}
