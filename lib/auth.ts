import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { dbConnect } from './dbConnect';
import User from '@/model/User';
import { JWT_SECRET } from '@/config';

const JWT_SECRET_KEY = JWT_SECRET;

export interface AuthUser {
    id: string;
    email: string;
    role: 'admin' | 'user';
    fullname: string;
}

export function generateToken(user: AuthUser): string {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
            fullname: user.fullname
        },
        JWT_SECRET_KEY,
        { expiresIn: '7d' }
    );
}

export function verifyToken(token: string): AuthUser | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY) as AuthUser;
        return decoded;
    } catch (error) {
        return null;
    }
}

export async function getUserFromToken(token: string): Promise<AuthUser | null> {
    try {
        const decoded = verifyToken(token);
        if (!decoded) return null;

        await dbConnect();
        const user = await User.findById(decoded.id).select('-password').lean();
        
        if (!user) return null;

        return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            fullname: user.fullname
        };
    } catch (error) {
        return null;
    }
}

export function getTokenFromRequest(request: NextRequest): string | null {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }
    
    const cookieToken = request.cookies.get('auth-token')?.value;
    return cookieToken || null;
}