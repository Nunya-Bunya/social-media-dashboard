import { AIAssistantsService } from './ai-assistants.service';
import { CreateAIAssistantDto, UpdateAIAssistantDto, CreateChatSessionDto, SendMessageDto, CreateBusinessDocumentDto, UpdateBusinessDocumentDto, CreateAITaskDto, UpdateAITaskDto, GenerateContentDto, GlobalSearchDto } from './dto/ai-assistants.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class AIAssistantsController {
    private readonly aiAssistantsService;
    constructor(aiAssistantsService: AIAssistantsService);
    create(createDto: CreateAIAssistantDto, req: any): Promise<{
        creator: {
            createdAt: Date;
            id: string;
            updatedAt: Date;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            tenantId: string;
        };
        brand: {
            name: string;
            createdAt: Date;
            id: string;
            updatedAt: Date;
            tenantId: string;
            website: string | null;
            logoUrl: string | null;
            palette: import("@prisma/client/runtime/library").JsonValue | null;
            fonts: import("@prisma/client/runtime/library").JsonValue | null;
            createdBy: string;
        };
        client: {
            name: string;
            createdAt: Date;
            id: string;
            updatedAt: Date;
            email: string;
            tenantId: string;
            company: string | null;
            industry: string | null;
            targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
            budget: number | null;
            goals: import("@prisma/client/runtime/library").JsonValue | null;
        };
    } & {
        description: string | null;
        name: string;
        businessType: string;
        prompt: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        brandId: string | null;
        clientId: string | null;
        isActive: boolean;
        createdAt: Date;
        id: string;
        updatedAt: Date;
        tenantId: string;
        createdBy: string;
    }>;
    findAll(pagination: PaginationDto, req: any): Promise<{
        data: ({
            creator: {
                createdAt: Date;
                id: string;
                updatedAt: Date;
                email: string;
                password: string;
                role: import(".prisma/client").$Enums.Role;
                tenantId: string;
            };
            brand: {
                name: string;
                createdAt: Date;
                id: string;
                updatedAt: Date;
                tenantId: string;
                website: string | null;
                logoUrl: string | null;
                palette: import("@prisma/client/runtime/library").JsonValue | null;
                fonts: import("@prisma/client/runtime/library").JsonValue | null;
                createdBy: string;
            };
            client: {
                name: string;
                createdAt: Date;
                id: string;
                updatedAt: Date;
                email: string;
                tenantId: string;
                company: string | null;
                industry: string | null;
                targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
                budget: number | null;
                goals: import("@prisma/client/runtime/library").JsonValue | null;
            };
            _count: {
                chatSessions: number;
                businessDocuments: number;
                aiTasks: number;
            };
        } & {
            description: string | null;
            name: string;
            businessType: string;
            prompt: string;
            settings: import("@prisma/client/runtime/library").JsonValue | null;
            brandId: string | null;
            clientId: string | null;
            isActive: boolean;
            createdAt: Date;
            id: string;
            updatedAt: Date;
            tenantId: string;
            createdBy: string;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string, req: any): Promise<{
        chatSessions: ({
            messages: {
                content: string;
                sessionId: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                createdAt: Date;
                id: string;
                role: import(".prisma/client").$Enums.ChatMessageRole;
            }[];
        } & {
            title: string | null;
            assistantId: string;
            createdAt: Date;
            id: string;
            updatedAt: Date;
            tenantId: string;
            userId: string;
        })[];
        businessDocuments: {
            type: string;
            name: string;
            assistantId: string;
            content: string | null;
            fileUrl: string | null;
            fileSize: number | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            id: string;
            updatedAt: Date;
            tenantId: string;
        }[];
        aiTasks: {
            description: string | null;
            title: string;
            assistantId: string;
            priority: import(".prisma/client").$Enums.TaskPriority;
            dueDate: Date | null;
            status: import(".prisma/client").$Enums.TaskStatus;
            createdAt: Date;
            id: string;
            updatedAt: Date;
            tenantId: string;
            userId: string;
            completedAt: Date | null;
        }[];
        creator: {
            createdAt: Date;
            id: string;
            updatedAt: Date;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            tenantId: string;
        };
        brand: {
            name: string;
            createdAt: Date;
            id: string;
            updatedAt: Date;
            tenantId: string;
            website: string | null;
            logoUrl: string | null;
            palette: import("@prisma/client/runtime/library").JsonValue | null;
            fonts: import("@prisma/client/runtime/library").JsonValue | null;
            createdBy: string;
        };
        client: {
            name: string;
            createdAt: Date;
            id: string;
            updatedAt: Date;
            email: string;
            tenantId: string;
            company: string | null;
            industry: string | null;
            targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
            budget: number | null;
            goals: import("@prisma/client/runtime/library").JsonValue | null;
        };
    } & {
        description: string | null;
        name: string;
        businessType: string;
        prompt: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        brandId: string | null;
        clientId: string | null;
        isActive: boolean;
        createdAt: Date;
        id: string;
        updatedAt: Date;
        tenantId: string;
        createdBy: string;
    }>;
    update(id: string, updateDto: UpdateAIAssistantDto, req: any): Promise<{
        creator: {
            createdAt: Date;
            id: string;
            updatedAt: Date;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            tenantId: string;
        };
        brand: {
            name: string;
            createdAt: Date;
            id: string;
            updatedAt: Date;
            tenantId: string;
            website: string | null;
            logoUrl: string | null;
            palette: import("@prisma/client/runtime/library").JsonValue | null;
            fonts: import("@prisma/client/runtime/library").JsonValue | null;
            createdBy: string;
        };
        client: {
            name: string;
            createdAt: Date;
            id: string;
            updatedAt: Date;
            email: string;
            tenantId: string;
            company: string | null;
            industry: string | null;
            targetAudience: import("@prisma/client/runtime/library").JsonValue | null;
            budget: number | null;
            goals: import("@prisma/client/runtime/library").JsonValue | null;
        };
    } & {
        description: string | null;
        name: string;
        businessType: string;
        prompt: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
        brandId: string | null;
        clientId: string | null;
        isActive: boolean;
        createdAt: Date;
        id: string;
        updatedAt: Date;
        tenantId: string;
        createdBy: string;
    }>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
    createChatSession(createDto: CreateChatSessionDto, req: any): Promise<{
        assistant: {
            description: string | null;
            name: string;
            businessType: string;
            prompt: string;
            settings: import("@prisma/client/runtime/library").JsonValue | null;
            brandId: string | null;
            clientId: string | null;
            isActive: boolean;
            createdAt: Date;
            id: string;
            updatedAt: Date;
            tenantId: string;
            createdBy: string;
        };
        messages: {
            content: string;
            sessionId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            id: string;
            role: import(".prisma/client").$Enums.ChatMessageRole;
        }[];
    } & {
        title: string | null;
        assistantId: string;
        createdAt: Date;
        id: string;
        updatedAt: Date;
        tenantId: string;
        userId: string;
    }>;
    getChatSessions(assistantId: string, req: any): Promise<({
        messages: {
            content: string;
            sessionId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            id: string;
            role: import(".prisma/client").$Enums.ChatMessageRole;
        }[];
    } & {
        title: string | null;
        assistantId: string;
        createdAt: Date;
        id: string;
        updatedAt: Date;
        tenantId: string;
        userId: string;
    })[]>;
    getChatSession(id: string, req: any): Promise<{
        assistant: {
            description: string | null;
            name: string;
            businessType: string;
            prompt: string;
            settings: import("@prisma/client/runtime/library").JsonValue | null;
            brandId: string | null;
            clientId: string | null;
            isActive: boolean;
            createdAt: Date;
            id: string;
            updatedAt: Date;
            tenantId: string;
            createdBy: string;
        };
        messages: {
            content: string;
            sessionId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            id: string;
            role: import(".prisma/client").$Enums.ChatMessageRole;
        }[];
    } & {
        title: string | null;
        assistantId: string;
        createdAt: Date;
        id: string;
        updatedAt: Date;
        tenantId: string;
        userId: string;
    }>;
    sendMessage(sendDto: SendMessageDto, req: any): Promise<{
        userMessage: {
            content: string;
            sessionId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            id: string;
            role: import(".prisma/client").$Enums.ChatMessageRole;
        };
        assistantMessage: {
            content: string;
            sessionId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            id: string;
            role: import(".prisma/client").$Enums.ChatMessageRole;
        };
    }>;
    createBusinessDocument(createDto: CreateBusinessDocumentDto, req: any): Promise<{
        type: string;
        name: string;
        assistantId: string;
        content: string | null;
        fileUrl: string | null;
        fileSize: number | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        id: string;
        updatedAt: Date;
        tenantId: string;
    }>;
    getBusinessDocuments(assistantId: string, req: any): Promise<{
        type: string;
        name: string;
        assistantId: string;
        content: string | null;
        fileUrl: string | null;
        fileSize: number | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        id: string;
        updatedAt: Date;
        tenantId: string;
    }[]>;
    updateBusinessDocument(id: string, updateDto: UpdateBusinessDocumentDto, req: any): Promise<{
        type: string;
        name: string;
        assistantId: string;
        content: string | null;
        fileUrl: string | null;
        fileSize: number | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        id: string;
        updatedAt: Date;
        tenantId: string;
    }>;
    deleteBusinessDocument(id: string, req: any): Promise<{
        message: string;
    }>;
    createAITask(createDto: CreateAITaskDto, req: any): Promise<{
        description: string | null;
        title: string;
        assistantId: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        dueDate: Date | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        createdAt: Date;
        id: string;
        updatedAt: Date;
        tenantId: string;
        userId: string;
        completedAt: Date | null;
    }>;
    getAITasks(assistantId: string, req: any): Promise<{
        description: string | null;
        title: string;
        assistantId: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        dueDate: Date | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        createdAt: Date;
        id: string;
        updatedAt: Date;
        tenantId: string;
        userId: string;
        completedAt: Date | null;
    }[]>;
    updateAITask(id: string, updateDto: UpdateAITaskDto, req: any): Promise<{
        description: string | null;
        title: string;
        assistantId: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        dueDate: Date | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        createdAt: Date;
        id: string;
        updatedAt: Date;
        tenantId: string;
        userId: string;
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
