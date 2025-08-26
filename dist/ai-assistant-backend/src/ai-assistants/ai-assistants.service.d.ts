import { PrismaService } from '../common/prisma.service';
import { CreateAIAssistantDto, UpdateAIAssistantDto, CreateChatSessionDto, SendMessageDto, CreateBusinessDocumentDto, UpdateBusinessDocumentDto, CreateAITaskDto, UpdateAITaskDto, GenerateContentDto, GlobalSearchDto } from './dto/ai-assistants.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class AIAssistantsService {
    private prisma;
    constructor(prisma: PrismaService);
    createAssistant(createDto: CreateAIAssistantDto, userId: string, tenantId: string): Promise<any>;
    getAssistants(pagination: PaginationDto, tenantId: string): Promise<{
        data: any;
        meta: {
            page: PaginationDto;
            limit: PaginationDto;
            total: any;
            totalPages: number;
        };
    }>;
    getAssistant(id: string, tenantId: string): Promise<any>;
    updateAssistant(id: string, updateDto: UpdateAIAssistantDto, tenantId: string): Promise<any>;
    deleteAssistant(id: string, tenantId: string): Promise<{
        message: string;
    }>;
    createChatSession(createDto: CreateChatSessionDto, userId: string, tenantId: string): Promise<any>;
    getChatSessions(assistantId: string, userId: string, tenantId: string): Promise<any>;
    getChatSession(id: string, userId: string, tenantId: string): Promise<any>;
    sendMessage(sendDto: SendMessageDto, userId: string, tenantId: string): Promise<{
        userMessage: any;
        assistantMessage: any;
    }>;
    createBusinessDocument(createDto: CreateBusinessDocumentDto, tenantId: string): Promise<any>;
    getBusinessDocuments(assistantId: string, tenantId: string): Promise<any>;
    updateBusinessDocument(id: string, updateDto: UpdateBusinessDocumentDto, tenantId: string): Promise<any>;
    deleteBusinessDocument(id: string, tenantId: string): Promise<{
        message: string;
    }>;
    createAITask(createDto: CreateAITaskDto, userId: string, tenantId: string): Promise<any>;
    getAITasks(assistantId: string, userId: string, tenantId: string): Promise<any>;
    updateAITask(id: string, updateDto: UpdateAITaskDto, userId: string, tenantId: string): Promise<any>;
    deleteAITask(id: string, userId: string, tenantId: string): Promise<{
        message: string;
    }>;
    generateContent(generateDto: GenerateContentDto, tenantId: string): Promise<{
        type: import("./dto/ai-assistants.dto").ContentType;
        content: string;
        generatedAt: Date;
    }>;
    globalSearch(searchDto: GlobalSearchDto, tenantId: string): Promise<{
        assistants: any[];
        chatSessions: any[];
        documents: any[];
        tasks: any[];
    }>;
    private generateAIResponse;
    private generateContentByType;
}
