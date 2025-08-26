import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import {
  CreateAIAssistantDto,
  UpdateAIAssistantDto,
  CreateChatSessionDto,
  SendMessageDto,
  CreateBusinessDocumentDto,
  UpdateBusinessDocumentDto,
  CreateAITaskDto,
  UpdateAITaskDto,
  GenerateContentDto,
  GlobalSearchDto,
} from './dto/ai-assistants.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class AIAssistantsService {
  constructor(private prisma: PrismaService) {}

  // AI Assistant Management
  async createAssistant(createDto: CreateAIAssistantDto, userId: string, tenantId: string) {
    const { brandId, clientId, ...assistantData } = createDto;

    // Validate brand and client if provided
    if (brandId) {
      const brand = await this.prisma.brand.findFirst({
        where: { id: brandId, tenantId },
      });
      if (!brand) {
        throw new NotFoundException('Brand not found');
      }
    }

    if (clientId) {
      const client = await this.prisma.client.findFirst({
        where: { id: clientId, tenantId },
      });
      if (!client) {
        throw new NotFoundException('Client not found');
      }
    }

    const assistant = await this.prisma.aIAssistant.create({
      data: {
        ...assistantData,
        brandId,
        clientId,
        createdBy: userId,
        tenantId,
      },
      include: {
        brand: true,
        client: true,
        creator: true,
      },
    });

    return assistant;
  }

  async getAssistants(pagination: PaginationDto, tenantId: string) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;

    const where = {
      tenantId,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as any } },
          { description: { contains: search, mode: 'insensitive' as any } },
          { businessType: { contains: search, mode: 'insensitive' as any } },
        ],
      }),
    };

    const [assistants, total] = await Promise.all([
      this.prisma.aIAssistant.findMany({
        where,
        include: {
          brand: true,
          client: true,
          creator: true,
          _count: {
            select: {
              chatSessions: true,
              businessDocuments: true,
              aiTasks: true,
            },
          },
        },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.aIAssistant.count({ where }),
    ]);

    return {
      data: assistants,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getAssistant(id: string, tenantId: string) {
    const assistant = await this.prisma.aIAssistant.findFirst({
      where: { id, tenantId },
      include: {
        brand: true,
        client: true,
        creator: true,
        chatSessions: {
          include: {
            messages: {
              orderBy: { createdAt: 'asc' },
            },
          },
          orderBy: { updatedAt: 'desc' },
        },
        businessDocuments: {
          orderBy: { updatedAt: 'desc' },
        },
        aiTasks: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!assistant) {
      throw new NotFoundException('AI Assistant not found');
    }

    return assistant;
  }

  async updateAssistant(id: string, updateDto: UpdateAIAssistantDto, tenantId: string) {
    const assistant = await this.prisma.aIAssistant.findFirst({
      where: { id, tenantId },
    });

    if (!assistant) {
      throw new NotFoundException('AI Assistant not found');
    }

    const updatedAssistant = await this.prisma.aIAssistant.update({
      where: { id },
      data: updateDto,
      include: {
        brand: true,
        client: true,
        creator: true,
      },
    });

    return updatedAssistant;
  }

  async deleteAssistant(id: string, tenantId: string) {
    const assistant = await this.prisma.aIAssistant.findFirst({
      where: { id, tenantId },
    });

    if (!assistant) {
      throw new NotFoundException('AI Assistant not found');
    }

    await this.prisma.aIAssistant.delete({
      where: { id },
    });

    return { message: 'AI Assistant deleted successfully' };
  }

  // Chat Management
  async createChatSession(createDto: CreateChatSessionDto, userId: string, tenantId: string) {
    const assistant = await this.prisma.aIAssistant.findFirst({
      where: { id: createDto.assistantId, tenantId },
    });

    if (!assistant) {
      throw new NotFoundException('AI Assistant not found');
    }

    const session = await this.prisma.chatSession.create({
      data: {
        title: createDto.title || 'New Chat',
        assistantId: createDto.assistantId,
        userId,
        tenantId,
      },
      include: {
        assistant: true,
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return session;
  }

  async getChatSessions(assistantId: string, userId: string, tenantId: string) {
    const sessions = await this.prisma.chatSession.findMany({
      where: {
        assistantId,
        userId,
        tenantId,
      },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return sessions;
  }

  async getChatSession(id: string, userId: string, tenantId: string) {
    const session = await this.prisma.chatSession.findFirst({
      where: { id, userId, tenantId },
      include: {
        assistant: true,
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!session) {
      throw new NotFoundException('Chat session not found');
    }

    return session;
  }

  async sendMessage(sendDto: SendMessageDto, userId: string, tenantId: string) {
    const session = await this.prisma.chatSession.findFirst({
      where: { id: sendDto.sessionId, userId, tenantId },
      include: {
        assistant: true,
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!session) {
      throw new NotFoundException('Chat session not found');
    }

    // Save user message
    const userMessage = await this.prisma.chatMessage.create({
      data: {
        sessionId: sendDto.sessionId,
        role: 'USER',
        content: sendDto.content,
      },
    });

    // Generate AI response (simulated for now)
    const aiResponse = await this.generateAIResponse(session, sendDto.content);

    // Save AI response
    const assistantMessage = await this.prisma.chatMessage.create({
      data: {
        sessionId: sendDto.sessionId,
        role: 'ASSISTANT',
        content: aiResponse,
      },
    });

    // Update session timestamp
    await this.prisma.chatSession.update({
      where: { id: sendDto.sessionId },
      data: { updatedAt: new Date() },
    });

    return {
      userMessage,
      assistantMessage,
    };
  }

  // Business Documents Management
  async createBusinessDocument(createDto: CreateBusinessDocumentDto, tenantId: string) {
    const assistant = await this.prisma.aIAssistant.findFirst({
      where: { id: createDto.assistantId, tenantId },
    });

    if (!assistant) {
      throw new NotFoundException('AI Assistant not found');
    }

    const document = await this.prisma.businessDocument.create({
      data: {
        ...createDto,
        tenantId,
      },
    });

    return document;
  }

  async getBusinessDocuments(assistantId: string, tenantId: string) {
    const documents = await this.prisma.businessDocument.findMany({
      where: {
        assistantId,
        tenantId,
      },
      orderBy: { updatedAt: 'desc' },
    });

    return documents;
  }

  async updateBusinessDocument(id: string, updateDto: UpdateBusinessDocumentDto, tenantId: string) {
    const document = await this.prisma.businessDocument.findFirst({
      where: { id, tenantId },
    });

    if (!document) {
      throw new NotFoundException('Business document not found');
    }

    const updatedDocument = await this.prisma.businessDocument.update({
      where: { id },
      data: updateDto,
    });

    return updatedDocument;
  }

  async deleteBusinessDocument(id: string, tenantId: string) {
    const document = await this.prisma.businessDocument.findFirst({
      where: { id, tenantId },
    });

    if (!document) {
      throw new NotFoundException('Business document not found');
    }

    await this.prisma.businessDocument.delete({
      where: { id },
    });

    return { message: 'Business document deleted successfully' };
  }

  // AI Tasks Management
  async createAITask(createDto: CreateAITaskDto, userId: string, tenantId: string) {
    const assistant = await this.prisma.aIAssistant.findFirst({
      where: { id: createDto.assistantId, tenantId },
    });

    if (!assistant) {
      throw new NotFoundException('AI Assistant not found');
    }

    const task = await this.prisma.aITask.create({
      data: {
        ...createDto,
        userId,
        tenantId,
      },
    });

    return task;
  }

  async getAITasks(assistantId: string, userId: string, tenantId: string) {
    const tasks = await this.prisma.aITask.findMany({
      where: {
        assistantId,
        userId,
        tenantId,
      },
      orderBy: { createdAt: 'desc' },
    });

    return tasks;
  }

  async updateAITask(id: string, updateDto: UpdateAITaskDto, userId: string, tenantId: string) {
    const task = await this.prisma.aITask.findFirst({
      where: { id, userId, tenantId },
    });

    if (!task) {
      throw new NotFoundException('AI Task not found');
    }

    const updatedTask = await this.prisma.aITask.update({
      where: { id },
      data: updateDto,
    });

    return updatedTask;
  }

  async deleteAITask(id: string, userId: string, tenantId: string) {
    const task = await this.prisma.aITask.findFirst({
      where: { id, userId, tenantId },
    });

    if (!task) {
      throw new NotFoundException('AI Task not found');
    }

    await this.prisma.aITask.delete({
      where: { id },
    });

    return { message: 'AI Task deleted successfully' };
  }

  // Content Generation
  async generateContent(generateDto: GenerateContentDto, tenantId: string) {
    const assistant = await this.prisma.aIAssistant.findFirst({
      where: { id: generateDto.assistantId, tenantId },
    });

    if (!assistant) {
      throw new NotFoundException('AI Assistant not found');
    }

    // Generate content based on type and prompt
    const content = await this.generateContentByType(generateDto);

    return {
      type: generateDto.type,
      content,
      generatedAt: new Date(),
    };
  }

  // Global Search
  async globalSearch(searchDto: GlobalSearchDto, tenantId: string) {
    const { query, filters } = searchDto;

    const results = {
      assistants: [],
      chatSessions: [],
      documents: [],
      tasks: [],
    };

    // Search assistants
    results.assistants = await this.prisma.aIAssistant.findMany({
      where: {
        tenantId,
        OR: [
          { name: { contains: query, mode: 'insensitive' as any } },
          { description: { contains: query, mode: 'insensitive' as any } },
          { businessType: { contains: query, mode: 'insensitive' as any } },
        ],
        ...(filters?.businessTypes && {
          businessType: { in: filters.businessTypes },
        }),
      },
      include: {
        brand: true,
        client: true,
      },
    });

    // Search chat messages
    const chatMessages = await this.prisma.chatMessage.findMany({
      where: {
        session: {
          tenantId,
        },
        content: { contains: query, mode: 'insensitive' as any },
      },
      include: {
        session: {
          include: {
            assistant: true,
          },
        },
      },
    });

    // Group chat messages by session
    const sessionMap = new Map();
    chatMessages.forEach(message => {
      if (!sessionMap.has(message.sessionId)) {
        sessionMap.set(message.sessionId, {
          ...message.session,
          matchingMessages: [],
        });
      }
      sessionMap.get(message.sessionId).matchingMessages.push(message);
    });

    results.chatSessions = Array.from(sessionMap.values());

    // Search business documents
    results.documents = await this.prisma.businessDocument.findMany({
      where: {
        tenantId,
        OR: [
          { name: { contains: query, mode: 'insensitive' as any } },
          { content: { contains: query, mode: 'insensitive' as any } },
        ],
      },
      include: {
        assistant: true,
      },
    });

    // Search tasks
    results.tasks = await this.prisma.aITask.findMany({
      where: {
        tenantId,
        OR: [
          { title: { contains: query, mode: 'insensitive' as any } },
          { description: { contains: query, mode: 'insensitive' as any } },
        ],
      },
      include: {
        assistant: true,
      },
    });

    return results;
  }

  // Helper methods
  private async generateAIResponse(session: any, userMessage: string): Promise<string> {
    // This would integrate with OpenAI or other AI service
    // For now, return a simulated response
    const responses = [
      "I understand your request. Let me help you with that.",
      "Based on your business context, here's what I recommend...",
      "I can assist you with this. Here are some suggestions...",
      "Let me analyze this and provide you with the best approach.",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  private async generateContentByType(generateDto: GenerateContentDto): Promise<string> {
    const { type, prompt, context, parameters } = generateDto;

    // This would integrate with AI service for content generation
    // For now, return template content based on type
    const templates = {
      SOCIAL_POST: `📱 Social Media Post\n\n${prompt}\n\n#marketing #business`,
      BLOG_POST: `📝 Blog Post\n\nTitle: ${prompt}\n\nIntroduction:\nThis is a sample blog post introduction...`,
      AD_COPY: `🎯 Ad Copy\n\nHeadline: ${prompt}\n\nBody: Compelling ad copy that converts...`,
      EMAIL: `📧 Email\n\nSubject: ${prompt}\n\nDear [Recipient],\n\nThis is a sample email content...`,
      WEBSITE_CONTENT: `🌐 Website Content\n\n${prompt}\n\nProfessional website content...`,
      PRESS_RELEASE: `📰 Press Release\n\nFOR IMMEDIATE RELEASE\n\n${prompt}\n\nContact: [Your Contact Info]`,
      VIDEO_SCRIPT: `🎬 Video Script\n\n${prompt}\n\n[Scene 1]\nNarrator: Welcome to our video...`,
      PODCAST_SCRIPT: `🎙️ Podcast Script\n\n${prompt}\n\nHost: Welcome to today's episode...`,
    };

    return templates[type] || `Generated content for ${type}:\n\n${prompt}`;
  }
}
