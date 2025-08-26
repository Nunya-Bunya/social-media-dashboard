"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        credentials: true,
    });
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Nunya Bunya Marketing Platform')
        .setDescription('Comprehensive marketing automation and management system')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('test', 'Test endpoints')
        .addTag('auth', 'Authentication endpoints')
        .addTag('crm', 'CRM and lead management')
        .addTag('assets', 'Creative assets management')
        .addTag('projects', 'Photography and videography projects')
        .addTag('ai-assistants', 'Multi-business AI assistants')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`🚀 Nunya Bunya Marketing Platform is running on: http://localhost:${port}`);
    console.log(`📚 API Documentation available at: http://localhost:${port}/api/docs`);
    console.log(`🧪 Test endpoint available at: http://localhost:${port}/api/test`);
}
bootstrap();
//# sourceMappingURL=main.js.map