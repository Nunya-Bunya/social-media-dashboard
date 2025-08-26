import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
