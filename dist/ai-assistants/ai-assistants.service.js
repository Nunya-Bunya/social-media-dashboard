"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIAssistantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let AIAssistantsService = class AIAssistantsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAssistant(createDto, userId, tenantId) {
        const { brandId, clientId, ...assistantData } = createDto;
        if (brandId) {
            const brand = await this.prisma.brand.findFirst({
                where: { id: brandId, tenantId },
            });
            if (!brand) {
                throw new common_1.NotFoundException('Brand not found');
            }
        }
        if (clientId) {
            const client = await this.prisma.client.findFirst({
                where: { id: clientId, tenantId },
            });
            if (!client) {
                throw new common_1.NotFoundException('Client not found');
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
    async getAssistants(pagination, tenantId) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
        const where = {
            tenantId,
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                    { businessType: { contains: search, mode: 'insensitive' } },
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
    async getAssistant(id, tenantId) {
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
            throw new common_1.NotFoundException('AI Assistant not found');
        }
        return assistant;
    }
    async updateAssistant(id, updateDto, tenantId) {
        const assistant = await this.prisma.aIAssistant.findFirst({
            where: { id, tenantId },
        });
        if (!assistant) {
            throw new common_1.NotFoundException('AI Assistant not found');
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
    async deleteAssistant(id, tenantId) {
        const assistant = await this.prisma.aIAssistant.findFirst({
            where: { id, tenantId },
        });
        if (!assistant) {
            throw new common_1.NotFoundException('AI Assistant not found');
        }
        await this.prisma.aIAssistant.delete({
            where: { id },
        });
        return { message: 'AI Assistant deleted successfully' };
    }
    async createChatSession(createDto, userId, tenantId) {
        const assistant = await this.prisma.aIAssistant.findFirst({
            where: { id: createDto.assistantId, tenantId },
        });
        if (!assistant) {
            throw new common_1.NotFoundException('AI Assistant not found');
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
    async getChatSessions(assistantId, userId, tenantId) {
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
    async getChatSession(id, userId, tenantId) {
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
            throw new common_1.NotFoundException('Chat session not found');
        }
        return session;
    }
    async sendMessage(sendDto, userId, tenantId) {
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
            throw new common_1.NotFoundException('Chat session not found');
        }
        const userMessage = await this.prisma.chatMessage.create({
            data: {
                sessionId: sendDto.sessionId,
                role: 'USER',
                content: sendDto.content,
            },
        });
        const aiResponse = await this.generateAIResponse(session, sendDto.content);
        const assistantMessage = await this.prisma.chatMessage.create({
            data: {
                sessionId: sendDto.sessionId,
                role: 'ASSISTANT',
                content: aiResponse,
            },
        });
        await this.prisma.chatSession.update({
            where: { id: sendDto.sessionId },
            data: { updatedAt: new Date() },
        });
        return {
            userMessage,
            assistantMessage,
        };
    }
    async createBusinessDocument(createDto, tenantId) {
        const assistant = await this.prisma.aIAssistant.findFirst({
            where: { id: createDto.assistantId, tenantId },
        });
        if (!assistant) {
            throw new common_1.NotFoundException('AI Assistant not found');
        }
        const document = await this.prisma.businessDocument.create({
            data: {
                ...createDto,
                tenantId,
            },
        });
        return document;
    }
    async getBusinessDocuments(assistantId, tenantId) {
        const documents = await this.prisma.businessDocument.findMany({
            where: {
                assistantId,
                tenantId,
            },
            orderBy: { updatedAt: 'desc' },
        });
        return documents;
    }
    async updateBusinessDocument(id, updateDto, tenantId) {
        const document = await this.prisma.businessDocument.findFirst({
            where: { id, tenantId },
        });
        if (!document) {
            throw new common_1.NotFoundException('Business document not found');
        }
        const updatedDocument = await this.prisma.businessDocument.update({
            where: { id },
            data: updateDto,
        });
        return updatedDocument;
    }
    async deleteBusinessDocument(id, tenantId) {
        const document = await this.prisma.businessDocument.findFirst({
            where: { id, tenantId },
        });
        if (!document) {
            throw new common_1.NotFoundException('Business document not found');
        }
        await this.prisma.businessDocument.delete({
            where: { id },
        });
        return { message: 'Business document deleted successfully' };
    }
    async createAITask(createDto, userId, tenantId) {
        const assistant = await this.prisma.aIAssistant.findFirst({
            where: { id: createDto.assistantId, tenantId },
        });
        if (!assistant) {
            throw new common_1.NotFoundException('AI Assistant not found');
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
    async getAITasks(assistantId, userId, tenantId) {
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
    async updateAITask(id, updateDto, userId, tenantId) {
        const task = await this.prisma.aITask.findFirst({
            where: { id, userId, tenantId },
        });
        if (!task) {
            throw new common_1.NotFoundException('AI Task not found');
        }
        const updatedTask = await this.prisma.aITask.update({
            where: { id },
            data: updateDto,
        });
        return updatedTask;
    }
    async deleteAITask(id, userId, tenantId) {
        const task = await this.prisma.aITask.findFirst({
            where: { id, userId, tenantId },
        });
        if (!task) {
            throw new common_1.NotFoundException('AI Task not found');
        }
        await this.prisma.aITask.delete({
            where: { id },
        });
        return { message: 'AI Task deleted successfully' };
    }
    async generateContent(generateDto, tenantId) {
        const assistant = await this.prisma.aIAssistant.findFirst({
            where: { id: generateDto.assistantId, tenantId },
        });
        if (!assistant) {
            throw new common_1.NotFoundException('AI Assistant not found');
        }
        const content = await this.generateContentByType(generateDto);
        return {
            type: generateDto.type,
            content,
            generatedAt: new Date(),
        };
    }
    async globalSearch(searchDto, tenantId) {
        const { query, filters } = searchDto;
        const results = {
            assistants: [],
            chatSessions: [],
            documents: [],
            tasks: [],
        };
        results.assistants = await this.prisma.aIAssistant.findMany({
            where: {
                tenantId,
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                    { businessType: { contains: query, mode: 'insensitive' } },
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
        const chatMessages = await this.prisma.chatMessage.findMany({
            where: {
                session: {
                    tenantId,
                },
                content: { contains: query, mode: 'insensitive' },
            },
            include: {
                session: {
                    include: {
                        assistant: true,
                    },
                },
            },
        });
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
        results.documents = await this.prisma.businessDocument.findMany({
            where: {
                tenantId,
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { content: { contains: query, mode: 'insensitive' } },
                ],
            },
            include: {
                assistant: true,
            },
        });
        results.tasks = await this.prisma.aITask.findMany({
            where: {
                tenantId,
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                ],
            },
            include: {
                assistant: true,
            },
        });
        return results;
    }
    async generateAIResponse(session, userMessage) {
        const responses = [
            "I understand your request. Let me help you with that.",
            "Based on your business context, here's what I recommend...",
            "I can assist you with this. Here are some suggestions...",
            "Let me analyze this and provide you with the best approach.",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    async generateContentByType(generateDto) {
        const { type, prompt, context, parameters } = generateDto;
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
};
exports.AIAssistantsService = AIAssistantsService;
exports.AIAssistantsService = AIAssistantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AIAssistantsService);
//# sourceMappingURL=ai-assistants.service.js.map