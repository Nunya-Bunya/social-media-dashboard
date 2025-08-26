export declare enum ChatMessageRole {
    USER = "USER",
    ASSISTANT = "ASSISTANT",
    SYSTEM = "SYSTEM"
}
export declare enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare enum TaskPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    URGENT = "URGENT"
}
export declare enum ContentType {
    SOCIAL_POST = "SOCIAL_POST",
    BLOG_POST = "BLOG_POST",
    AD_COPY = "AD_COPY",
    EMAIL = "EMAIL",
    WEBSITE_CONTENT = "WEBSITE_CONTENT",
    PRESS_RELEASE = "PRESS_RELEASE",
    VIDEO_SCRIPT = "VIDEO_SCRIPT",
    PODCAST_SCRIPT = "PODCAST_SCRIPT"
}
export declare class CreateAIAssistantDto {
    name: string;
    description?: string;
    businessType: string;
    prompt: string;
    settings?: any;
    brandId?: string;
    clientId?: string;
}
export declare class UpdateAIAssistantDto {
    name?: string;
    description?: string;
    businessType?: string;
    prompt?: string;
    settings?: any;
    isActive?: boolean;
}
export declare class CreateChatSessionDto {
    title?: string;
    assistantId: string;
}
export declare class SendMessageDto {
    content: string;
    sessionId: string;
}
export declare class CreateBusinessDocumentDto {
    name: string;
    type: string;
    content?: string;
    fileUrl?: string;
    fileSize?: number;
    metadata?: any;
    assistantId: string;
}
export declare class UpdateBusinessDocumentDto {
    name?: string;
    content?: string;
    metadata?: any;
}
export declare class CreateAITaskDto {
    title: string;
    description?: string;
    priority?: TaskPriority;
    dueDate?: string;
    assistantId: string;
}
export declare class UpdateAITaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: string;
}
export declare class GenerateContentDto {
    type: ContentType;
    prompt: string;
    context?: string;
    parameters?: any;
    assistantId: string;
}
export declare class GlobalSearchDto {
    query: string;
    filters?: {
        businessTypes?: string[];
        contentTypes?: ContentType[];
        dateRange?: {
            from: string;
            to: string;
        };
    };
}
