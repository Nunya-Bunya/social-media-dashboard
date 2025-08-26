import { AIAssistantsService } from './ai-assistants.service';
import { CreateAIAssistantDto, UpdateAIAssistantDto, CreateChatSessionDto, SendMessageDto, CreateBusinessDocumentDto, UpdateBusinessDocumentDto, CreateAITaskDto, UpdateAITaskDto, GenerateContentDto, GlobalSearchDto } from './dto/ai-assistants.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class AIAssistantsController {
    private readonly aiAssistantsService;
    constructor(aiAssistantsService: AIAssistantsService);
    create(createDto: CreateAIAssistantDto, req: any): Promise<any>;
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
    update(id: string, updateDto: UpdateAIAssistantDto, req: any): Promise<any>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
    createChatSession(createDto: CreateChatSessionDto, req: any): Promise<any>;
    getChatSessions(assistantId: string, req: any): Promise<any>;
    getChatSession(id: string, req: any): Promise<any>;
    sendMessage(sendDto: SendMessageDto, req: any): Promise<{
        userMessage: any;
        assistantMessage: any;
    }>;
    createBusinessDocument(createDto: CreateBusinessDocumentDto, req: any): Promise<any>;
    getBusinessDocuments(assistantId: string, req: any): Promise<any>;
    updateBusinessDocument(id: string, updateDto: UpdateBusinessDocumentDto, req: any): Promise<any>;
    deleteBusinessDocument(id: string, req: any): Promise<{
        message: string;
    }>;
    createAITask(createDto: CreateAITaskDto, req: any): Promise<any>;
    getAITasks(assistantId: string, req: any): Promise<any>;
    updateAITask(id: string, updateDto: UpdateAITaskDto, req: any): Promise<any>;
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
