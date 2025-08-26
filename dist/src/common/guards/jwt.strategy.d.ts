import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate(payload: any): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        tenantId: string;
        tenant: {
            name: string;
            settings: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            id: string;
            domain: string | null;
            updatedAt: Date;
        };
    }>;
}
export {};
