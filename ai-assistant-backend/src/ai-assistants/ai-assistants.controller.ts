import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
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
import { JwtAuthGuard } from '../common/guards/jwt.guard';

@ApiTags('ai-assistants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
    return this.aiAssistantsService.createAssistant(
      createDto,
      req.user.userId,
      req.user.tenantId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all AI Assistants with pagination' })
  @ApiResponse({ status: 200, description: 'AI Assistants retrieved successfully' })
  findAll(@Query() pagination: PaginationDto, @Request() req: any) {
    return this.aiAssistantsService.getAssistants(pagination, req.user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get AI Assistant by ID' })
  @ApiResponse({ status: 200, description: 'AI Assistant found' })
  @ApiResponse({ status: 404, description: 'AI Assistant not found' })
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.aiAssistantsService.getAssistant(id, req.user.tenantId);
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
    return this.aiAssistantsService.updateAssistant(id, updateDto, req.user.tenantId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete AI Assistant' })
  @ApiResponse({ status: 200, description: 'AI Assistant deleted successfully' })
  @ApiResponse({ status: 404, description: 'AI Assistant not found' })
  remove(@Param('id') id: string, @Request() req: any) {
    return this.aiAssistantsService.deleteAssistant(id, req.user.tenantId);
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
    return this.aiAssistantsService.createChatSession(
      createDto,
      req.user.userId,
      req.user.tenantId,
    );
  }

  @Get('chat/sessions/:assistantId')
  @ApiOperation({ summary: 'Get chat sessions for an assistant' })
  @ApiResponse({ status: 200, description: 'Chat sessions retrieved' })
  getChatSessions(
    @Param('assistantId') assistantId: string,
    @Request() req: any,
  ) {
    return this.aiAssistantsService.getChatSessions(
      assistantId,
      req.user.userId,
      req.user.tenantId,
    );
  }

  @Get('chat/session/:id')
  @ApiOperation({ summary: 'Get chat session by ID' })
  @ApiResponse({ status: 200, description: 'Chat session found' })
  @ApiResponse({ status: 404, description: 'Chat session not found' })
  getChatSession(@Param('id') id: string, @Request() req: any) {
    return this.aiAssistantsService.getChatSession(
      id,
      req.user.userId,
      req.user.tenantId,
    );
  }

  @Post('chat/message')
  @ApiOperation({ summary: 'Send a message in a chat session' })
  @ApiResponse({ status: 200, description: 'Message sent successfully' })
  @ApiResponse({ status: 404, description: 'Chat session not found' })
  sendMessage(
    @Body() sendDto: SendMessageDto,
    @Request() req: any,
  ) {
    return this.aiAssistantsService.sendMessage(
      sendDto,
      req.user.userId,
      req.user.tenantId,
    );
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
    return this.aiAssistantsService.createBusinessDocument(
      createDto,
      req.user.tenantId,
    );
  }

  @Get('documents/:assistantId')
  @ApiOperation({ summary: 'Get business documents for an assistant' })
  @ApiResponse({ status: 200, description: 'Documents retrieved' })
  getBusinessDocuments(
    @Param('assistantId') assistantId: string,
    @Request() req: any,
  ) {
    return this.aiAssistantsService.getBusinessDocuments(
      assistantId,
      req.user.tenantId,
    );
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
    return this.aiAssistantsService.updateBusinessDocument(
      id,
      updateDto,
      req.user.tenantId,
    );
  }

  @Delete('documents/:id')
  @ApiOperation({ summary: 'Delete a business document' })
  @ApiResponse({ status: 200, description: 'Document deleted successfully' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  deleteBusinessDocument(@Param('id') id: string, @Request() req: any) {
    return this.aiAssistantsService.deleteBusinessDocument(id, req.user.tenantId);
  }

  // AI Tasks Management
  @Post('tasks')
  @ApiOperation({ summary: 'Create an AI task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 404, description: 'AI Assistant not found' })
  createAITask(
    @Body() createDto: CreateAITaskDto,
    @Request() req: any,
  ) {
    return this.aiAssistantsService.createAITask(
      createDto,
      req.user.userId,
      req.user.tenantId,
    );
  }

  @Get('tasks/:assistantId')
  @ApiOperation({ summary: 'Get AI tasks for an assistant' })
  @ApiResponse({ status: 200, description: 'Tasks retrieved' })
  getAITasks(
    @Param('assistantId') assistantId: string,
    @Request() req: any,
  ) {
    return this.aiAssistantsService.getAITasks(
      assistantId,
      req.user.userId,
      req.user.tenantId,
    );
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
    return this.aiAssistantsService.updateAITask(
      id,
      updateDto,
      req.user.userId,
      req.user.tenantId,
    );
  }

  @Delete('tasks/:id')
  @ApiOperation({ summary: 'Delete an AI task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  deleteAITask(@Param('id') id: string, @Request() req: any) {
    return this.aiAssistantsService.deleteAITask(
      id,
      req.user.userId,
      req.user.tenantId,
    );
  }

  // Content Generation
  @Post('content/generate')
  @ApiOperation({ summary: 'Generate content using AI' })
  @ApiResponse({ status: 200, description: 'Content generated successfully' })
  @ApiResponse({ status: 404, description: 'AI Assistant not found' })
  generateContent(
    @Body() generateDto: GenerateContentDto,
    @Request() req: any,
  ) {
    return this.aiAssistantsService.generateContent(
      generateDto,
      req.user.tenantId,
    );
  }

  // Global Search
  @Post('search')
  @ApiOperation({ summary: 'Global search across all AI assistants and content' })
  @ApiResponse({ status: 200, description: 'Search results retrieved' })
  globalSearch(
    @Body() searchDto: GlobalSearchDto,
    @Request() req: any,
  ) {
    return this.aiAssistantsService.globalSearch(
      searchDto,
      req.user.tenantId,
    );
  }
}
