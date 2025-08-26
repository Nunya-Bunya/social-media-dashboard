import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AIAssistantsService } from './ai-assistants.service';
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

@ApiTags('ai-assistants')
@Controller('ai-assistants')
export class AIAssistantsController {
  constructor(private readonly aiAssistantsService: AIAssistantsService) {}

  // AI Assistant Management
  @Post()
  @ApiOperation({ summary: 'Create a new AI Assistant' })
  @ApiResponse({ status: 201, description: 'AI Assistant created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Brand or client not found' })
  create(
    @Body() createDto: CreateAIAssistantDto,
    @Request() req: any,
  ) {
    // For now, use hardcoded values for testing
    const userId = 'test-user-id';
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.createAssistant(
      createDto,
      userId,
      tenantId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all AI Assistants with pagination' })
  @ApiResponse({ status: 200, description: 'AI Assistants retrieved successfully' })
  findAll(@Query() pagination: PaginationDto, @Request() req: any) {
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.getAssistants(pagination, tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get AI Assistant by ID' })
  @ApiResponse({ status: 200, description: 'AI Assistant found' })
  @ApiResponse({ status: 404, description: 'AI Assistant not found' })
  findOne(@Param('id') id: string, @Request() req: any) {
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.getAssistant(id, tenantId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update AI Assistant' })
  @ApiResponse({ status: 200, description: 'AI Assistant updated successfully' })
  @ApiResponse({ status: 404, description: 'AI Assistant not found' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAIAssistantDto,
    @Request() req: any,
  ) {
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.updateAssistant(id, updateDto, tenantId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete AI Assistant' })
  @ApiResponse({ status: 200, description: 'AI Assistant deleted successfully' })
  @ApiResponse({ status: 404, description: 'AI Assistant not found' })
  remove(@Param('id') id: string, @Request() req: any) {
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.deleteAssistant(id, tenantId);
  }

  // Chat Management
  @Post('chat/sessions')
  @ApiOperation({ summary: 'Create a new chat session' })
  @ApiResponse({ status: 201, description: 'Chat session created successfully' })
  @ApiResponse({ status: 404, description: 'AI Assistant not found' })
  createChatSession(
    @Body() createDto: CreateChatSessionDto,
    @Request() req: any,
  ) {
    const userId = 'test-user-id';
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.createChatSession(createDto, userId, tenantId);
  }

  @Get('chat/sessions/:assistantId')
  @ApiOperation({ summary: 'Get chat sessions for an assistant' })
  @ApiResponse({ status: 200, description: 'Chat sessions retrieved successfully' })
  getChatSessions(@Param('assistantId') assistantId: string, @Request() req: any) {
    const userId = 'test-user-id';
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.getChatSessions(assistantId, userId, tenantId);
  }

  @Get('chat/sessions/session/:id')
  @ApiOperation({ summary: 'Get a specific chat session' })
  @ApiResponse({ status: 200, description: 'Chat session found' })
  @ApiResponse({ status: 404, description: 'Chat session not found' })
  getChatSession(@Param('id') id: string, @Request() req: any) {
    const userId = 'test-user-id';
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.getChatSession(id, userId, tenantId);
  }

  @Post('chat/messages')
  @ApiOperation({ summary: 'Send a message in a chat session' })
  @ApiResponse({ status: 201, description: 'Message sent successfully' })
  @ApiResponse({ status: 404, description: 'Chat session not found' })
  sendMessage(@Body() sendDto: SendMessageDto, @Request() req: any) {
    const userId = 'test-user-id';
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.sendMessage(sendDto, userId, tenantId);
  }

  // Business Documents Management
  @Post('documents')
  @ApiOperation({ summary: 'Create a business document' })
  @ApiResponse({ status: 201, description: 'Document created successfully' })
  @ApiResponse({ status: 404, description: 'AI Assistant not found' })
  createBusinessDocument(
    @Body() createDto: CreateBusinessDocumentDto,
    @Request() req: any,
  ) {
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.createBusinessDocument(createDto, tenantId);
  }

  @Get('documents/:assistantId')
  @ApiOperation({ summary: 'Get business documents for an assistant' })
  @ApiResponse({ status: 200, description: 'Documents retrieved successfully' })
  getBusinessDocuments(@Param('assistantId') assistantId: string, @Request() req: any) {
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.getBusinessDocuments(assistantId, tenantId);
  }

  @Patch('documents/:id')
  @ApiOperation({ summary: 'Update a business document' })
  @ApiResponse({ status: 200, description: 'Document updated successfully' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  updateBusinessDocument(
    @Param('id') id: string,
    @Body() updateDto: UpdateBusinessDocumentDto,
    @Request() req: any,
  ) {
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.updateBusinessDocument(id, updateDto, tenantId);
  }

  @Delete('documents/:id')
  @ApiOperation({ summary: 'Delete a business document' })
  @ApiResponse({ status: 200, description: 'Document deleted successfully' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  removeBusinessDocument(@Param('id') id: string, @Request() req: any) {
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.deleteBusinessDocument(id, tenantId);
  }

  // AI Tasks Management
  @Post('tasks')
  @ApiOperation({ summary: 'Create an AI task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 404, description: 'AI Assistant not found' })
  createAITask(@Body() createDto: CreateAITaskDto, @Request() req: any) {
    const userId = 'test-user-id';
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.createAITask(createDto, userId, tenantId);
  }

  @Get('tasks/:assistantId')
  @ApiOperation({ summary: 'Get AI tasks for an assistant' })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  getAITasks(@Param('assistantId') assistantId: string, @Request() req: any) {
    const userId = 'test-user-id';
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.getAITasks(assistantId, userId, tenantId);
  }

  @Patch('tasks/:id')
  @ApiOperation({ summary: 'Update an AI task' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  updateAITask(
    @Param('id') id: string,
    @Body() updateDto: UpdateAITaskDto,
    @Request() req: any,
  ) {
    const userId = 'test-user-id';
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.updateAITask(id, updateDto, userId, tenantId);
  }

  @Delete('tasks/:id')
  @ApiOperation({ summary: 'Delete an AI task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  removeAITask(@Param('id') id: string, @Request() req: any) {
    const userId = 'test-user-id';
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.deleteAITask(id, userId, tenantId);
  }

  // Content Generation
  @Post('content/generate')
  @ApiOperation({ summary: 'Generate content using AI' })
  @ApiResponse({ status: 201, description: 'Content generated successfully' })
  @ApiResponse({ status: 404, description: 'AI Assistant not found' })
  generateContent(@Body() generateDto: GenerateContentDto, @Request() req: any) {
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.generateContent(generateDto, tenantId);
  }

  // Global Search
  @Post('search')
  @ApiOperation({ summary: 'Search across all AI assistant data' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  globalSearch(@Body() searchDto: GlobalSearchDto, @Request() req: any) {
    const tenantId = 'test-tenant-id';
    return this.aiAssistantsService.globalSearch(searchDto, tenantId);
  }
}
