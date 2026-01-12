import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken, getTokenFromRequest, AuthUser } from './auth';

export interface AuthenticatedRequest extends NextRequest {
    user?: AuthUser;
}

export async function requireAuth(request: NextRequest): Promise<{ user: AuthUser } | NextResponse> {
    const token = getTokenFromRequest(request);
    
    if (!token) {
        return NextResponse.json(
            { error: 'Không có token xác thực' },
            { status: 401 }
        );
    }

    const user = await getUserFromToken(token);
    
    if (!user) {
        return NextResponse.json(
            { error: 'Token không hợp lệ hoặc đã hết hạn' },
            { status: 401 }
        );
    }

    return { user };
}

export async function requireAdmin(request: NextRequest): Promise<{ user: AuthUser } | NextResponse> {
    const authResult = await requireAuth(request);
    
    if (authResult instanceof NextResponse) {
        return authResult;
    }

    if (authResult.user.role !== 'admin') {
        return NextResponse.json(
            { error: 'Chỉ admin mới có quyền truy cập' },
            { status: 403 }
        );
    }

    return authResult;
}

export async function requireOwnerOrAdmin(
    request: NextRequest, 
    resourceUserId: string
): Promise<{ user: AuthUser } | NextResponse> {
    const authResult = await requireAuth(request);
    
    if (authResult instanceof NextResponse) {
        return authResult;
    }

    const { user } = authResult;
    
    if (user.role !== 'admin' && user.id !== resourceUserId) {
        return NextResponse.json(
            { error: 'Bạn chỉ có thể truy cập tài nguyên của chính mình' },
            { status: 403 }
        );
    }

    return authResult;
}

export function withAuth(handler: (request: NextRequest, user: AuthUser, ...args: any[]) => Promise<NextResponse>) {
    return async (request: NextRequest, ...args: any[]) => {
        const authResult = await requireAuth(request);
        
        if (authResult instanceof NextResponse) {
            return authResult;
        }

        return handler(request, authResult.user, ...args);
    };
}

export function withAdmin(handler: (request: NextRequest, user: AuthUser, ...args: any[]) => Promise<NextResponse>) {
    return async (request: NextRequest, ...args: any[]) => {
        const authResult = await requireAdmin(request);
        
        if (authResult instanceof NextResponse) {
            return authResult;
        }

        return handler(request, authResult.user, ...args);
    };
}

export function withOwnerOrAdmin(
    getUserId: (request: NextRequest, ...args: any[]) => string | Promise<string>
) {
    return function(handler: (request: NextRequest, user: AuthUser, ...args: any[]) => Promise<NextResponse>) {
        return async (request: NextRequest, ...args: any[]) => {
            const resourceUserId = await getUserId(request, ...args);
            const authResult = await requireOwnerOrAdmin(request, resourceUserId);
            
            if (authResult instanceof NextResponse) {
                return authResult;
            }

            return handler(request, authResult.user, ...args);
        };
    };
}