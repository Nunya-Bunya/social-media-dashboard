import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtStrategy } from './guards/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';

@Global()
@Module({
  providers: [PrismaService, JwtStrategy, JwtAuthGuard],
  exports: [PrismaService, JwtStrategy, JwtAuthGuard],
})
export class CommonModule {}
