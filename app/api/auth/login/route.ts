import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", 
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email và mật khẩu là bắt buộc' },
                { 
                    status: 400,
                    headers: CORS_HEADERS
                }
            );
        }

        const user = await User.findOne({ email }).lean();
        
        if (!user) {
            return NextResponse.json(
                { error: 'Email hoặc mật khẩu không đúng' },
                { 
                    status: 401,
                    headers: CORS_HEADERS
                }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Email hoặc mật khẩu không đúng' },
                { 
                    status: 401,
                    headers: CORS_HEADERS
                }
            );
        }

        const authUser = {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            fullname: user.fullname
        };

        const token = generateToken(authUser);

        const response = NextResponse.json(
            {
                message: 'Đăng nhập thành công',
                user: {
                    id: authUser.id,
                    email: authUser.email,
                    fullname: authUser.fullname,
                    role: authUser.role
                },
                token
            },
            {
                status: 200,
                headers: CORS_HEADERS
            }
        );

        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return response;

    } catch (error: any) {
        return NextResponse.json(
            { error: 'Lỗi server: ' + error.message },
            { 
                status: 500,
                headers: CORS_HEADERS
            }
        );
    }
}