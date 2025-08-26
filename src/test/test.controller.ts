import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('test')
@Controller('test')
export class TestController {
  @Get()
  @ApiOperation({ summary: 'Test endpoint' })
  @ApiResponse({ status: 200, description: 'Backend is working!' })
  getTest() {
    return {
      message: '🎉 AI Assistant Backend is working!',
      timestamp: new Date().toISOString(),
      status: 'success',
      version: '1.0.0'
    };
  }

  @Post('echo')
  @ApiOperation({ summary: 'Echo test endpoint' })
  @ApiResponse({ status: 200, description: 'Echo response' })
  postEcho(@Body() data: any) {
    return {
      message: 'Echo response',
      received: data,
      timestamp: new Date().toISOString()
    };
  }
}
