import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/model/User";
import { withOwnerOrAdmin, withAdmin } from "@/lib/middleware";

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

export const GET = withOwnerOrAdmin(
    async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
        const { id } = await params;
        return id;
    }
)(async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await dbConnect();
        const { id } = await params;
        
        const targetUser = await User.findById(id).select('-password').lean();
        
        if (!targetUser) {
            return NextResponse.json(
                { error: 'Không tìm thấy người dùng' },
                { 
                    status: 404,
                    headers: CORS_HEADERS
                }
            );
        }

        return NextResponse.json(targetUser, {
            status: 200,
            headers: CORS_HEADERS
        });

    } catch(error: any) {
        return NextResponse.json(
            { error: error.message },
            { 
                status: 500,
                headers: CORS_HEADERS
            }
        );
    }
});

export const PUT = withOwnerOrAdmin(
    async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
        const { id } = await params;
        return id;
    }
)(async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        
        if (body.role && user.role !== 'admin') {
            return NextResponse.json(
                { error: 'Chỉ admin mới có thể thay đổi role' },
                { 
                    status: 403,
                    headers: CORS_HEADERS
                }
            );
        }

        const { password, ...updateBody } = body;
        
        if (password) {
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            updateBody.password = await bcrypt.hash(password, salt);
        }

        const updatingUser = await User.findByIdAndUpdate(
            id,
            updateBody,
            { new: true }
        ).select('-password');

        if (!updatingUser) {
            return NextResponse.json(
                { error: 'Không tìm thấy người dùng' },
                { 
                    status: 404,
                    headers: CORS_HEADERS
                }
            );
        }

        return NextResponse.json(updatingUser, {
            status: 200,
            headers: CORS_HEADERS
        });

    } catch(error: any) {
        return NextResponse.json(
            { error: error.message },
            { 
                status: 500,
                headers: CORS_HEADERS
            }
        );
    }
});

export const DELETE = withAdmin(async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await dbConnect();
        const { id } = await params;
        
        if (id === user.id) {
            return NextResponse.json(
                { error: 'Không thể xóa tài khoản của chính mình' },
                { 
                    status: 400,
                    headers: CORS_HEADERS
                }
            );
        }

        const deletingUser = await User.findByIdAndDelete(id).select('-password');
        
        if (!deletingUser) {
            return NextResponse.json(
                { error: 'Không tìm thấy người dùng' },
                { 
                    status: 404,
                    headers: CORS_HEADERS
                }
            );
        }

        return NextResponse.json(
            { message: 'Xóa người dùng thành công', user: deletingUser },
            {
                status: 200,
                headers: CORS_HEADERS
            }
        );

    } catch(error: any) {
        return NextResponse.json(
            { error: error.message },
            { 
                status: 500,
                headers: CORS_HEADERS
            }
        );
    }
});
