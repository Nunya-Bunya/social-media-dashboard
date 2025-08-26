import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Global API prefix
  app.setGlobalPrefix('api');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('AI Assistant Backend')
    .setDescription('Multi-Business AI Assistant API')
    .setVersion('1.0')
    .addTag('ai-assistants', 'AI Assistant management')
    .addTag('test', 'Test endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 AI Assistant Backend running on http://localhost:${port}`);
  console.log(`📚 API Documentation available at http://localhost:${port}/api/docs`);
  console.log(`🧪 Test endpoint available at http://localhost:${port}/api/test`);
}

bootstrap();
