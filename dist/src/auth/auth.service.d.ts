import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            tenant: any;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            tenant: {
                id: string;
                name: string;
                domain: string | null;
                settings: import("@prisma/client/runtime/library").JsonValue | null;
                createdAt: Date;
                updatedAt: Date;
            };
        };
    }>;
    validateUser(id: string): Promise<{
        tenant: {
            id: string;
            name: string;
            domain: string | null;
            settings: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        tenantId: string;
    }>;
}
