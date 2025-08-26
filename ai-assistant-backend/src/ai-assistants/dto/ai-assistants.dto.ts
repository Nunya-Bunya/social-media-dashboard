import { IsString, IsOptional, IsEnum, IsArray, IsBoolean, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Define enums locally since they're not in the current schema
export enum ChatMessageRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
  SYSTEM = 'SYSTEM',
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum ContentType {
  SOCIAL_POST = 'SOCIAL_POST',
  BLOG_POST = 'BLOG_POST',
  AD_COPY = 'AD_COPY',
  EMAIL = 'EMAIL',
  WEBSITE_CONTENT = 'WEBSITE_CONTENT',
  PRESS_RELEASE = 'PRESS_RELEASE',
  VIDEO_SCRIPT = 'VIDEO_SCRIPT',
  PODCAST_SCRIPT = 'PODCAST_SCRIPT',
}

export class CreateAIAssistantDto {
  @ApiProperty({ description: 'Assistant name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Assistant description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Business type', example: 'law' })
  @IsString()
  businessType: string;

  @ApiProperty({ description: 'Custom system prompt' })
  @IsString()
  prompt: string;

  @ApiProperty({ description: 'AI model settings', required: false })
  @IsOptional()
  settings?: any;

  @ApiProperty({ description: 'Brand ID', required: false })
  @IsOptional()
  @IsString()
  brandId?: string;

  @ApiProperty({ description: 'Client ID', required: false })
  @IsOptional()
  @IsString()
  clientId?: string;
}

export class UpdateAIAssistantDto {
  @ApiProperty({ description: 'Assistant name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Assistant description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Business type', required: false })
  @IsOptional()
  @IsString()
  businessType?: string;

  @ApiProperty({ description: 'Custom system prompt', required: false })
  @IsOptional()
  @IsString()
  prompt?: string;

  @ApiProperty({ description: 'AI model settings', required: false })
  @IsOptional()
  settings?: any;

  @ApiProperty({ description: 'Is assistant active', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateChatSessionDto {
  @ApiProperty({ description: 'Session title', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Assistant ID' })
  @IsString()
  assistantId: string;
}

export class SendMessageDto {
  @ApiProperty({ description: 'Message content' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'Session ID' })
  @IsString()
  sessionId: string;
}

export class CreateBusinessDocumentDto {
  @ApiProperty({ description: 'Document name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Document type', example: 'strategy' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Document content', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ description: 'File URL', required: false })
  @IsOptional()
  @IsString()
  fileUrl?: string;

  @ApiProperty({ description: 'File size', required: false })
  @IsOptional()
  fileSize?: number;

  @ApiProperty({ description: 'Document metadata', required: false })
  @IsOptional()
  metadata?: any;

  @ApiProperty({ description: 'Assistant ID' })
  @IsString()
  assistantId: string;
}

export class UpdateBusinessDocumentDto {
  @ApiProperty({ description: 'Document name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Document content', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ description: 'Document metadata', required: false })
  @IsOptional()
  metadata?: any;
}

export class CreateAITaskDto {
  @ApiProperty({ description: 'Task title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Task description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Task priority', enum: TaskPriority, required: false })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiProperty({ description: 'Due date', required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty({ description: 'Assistant ID' })
  @IsString()
  assistantId: string;
}

export class UpdateAITaskDto {
  @ApiProperty({ description: 'Task title', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Task description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Task status', enum: TaskStatus, required: false })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({ description: 'Task priority', enum: TaskPriority, required: false })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiProperty({ description: 'Due date', required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}

export class GenerateContentDto {
  @ApiProperty({ description: 'Content type', enum: ContentType })
  @IsEnum(ContentType)
  type: ContentType;

  @ApiProperty({ description: 'Content prompt' })
  @IsString()
  prompt: string;

  @ApiProperty({ description: 'Additional context', required: false })
  @IsOptional()
  context?: string;

  @ApiProperty({ description: 'Content parameters', required: false })
  @IsOptional()
  parameters?: any;

  @ApiProperty({ description: 'Assistant ID' })
  @IsString()
  assistantId: string;
}

export class GlobalSearchDto {
  @ApiProperty({ description: 'Search query' })
  @IsString()
  query: string;

  @ApiProperty({ description: 'Search filters', required: false })
  @IsOptional()
  filters?: {
    businessTypes?: string[];
    contentTypes?: ContentType[];
    dateRange?: {
      from: string;
      to: string;
    };
  };
}
