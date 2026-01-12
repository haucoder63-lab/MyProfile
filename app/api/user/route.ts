import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { withAuth, withAdmin } from "@/lib/middleware";
import { getTokenFromRequest, getUserFromToken } from "@/lib/auth";

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

export const GET = async (request: NextRequest) => {
    try {
        await dbConnect();
        const token = getTokenFromRequest(request);
        let user = null;
        
        if (token) {
            user = await getUserFromToken(token);
        }
        
        let users;
        if (user && user.role === 'admin') {
            users = await User.find({}).select('-password').sort({createdAt: -1}).lean().exec();
        } else if (user) {
            users = await User.find({ _id: user.id }).select('-password').lean().exec();
        } else {
            users = await User.find({}).select('fullname birthday email phone address specialization role avatar_url createdAt').sort({createdAt: -1}).limit(1).lean().exec();
        }
        
        return new NextResponse(JSON.stringify(users), {
            status: 200,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
                "Cache-Control": "s-maxage=60, stale-while-revalidate=300"
            }
        });

    } catch(error: any) {
         return new NextResponse(JSON.stringify({err: error.message}), {
            status: 500,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            }
        });
    }
};

export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();
    const {fullname, birthday, email, phone, password, address, specialization, role, avatar_url } = body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new NextResponse(JSON.stringify({err: 'Email đã được sử dụng'}), {
                status: 400,
                headers: {
                    ...CORS_HEADERS,
                    "Content-Type": "application/json",
                }
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            fullname: fullname, 
            birthday: birthday, 
            email: email, 
            phone: phone,
            password: hashedPassword, 
            address: address, 
            specialization: specialization,
            role: role || 'user',
            avatar_url: avatar_url
        });
        
        const userResponse = { ...user.toObject() };
        delete userResponse.password;
        
        return new NextResponse(JSON.stringify(userResponse), {
            status: 201,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            }
        });

    }catch(error: any) {
          return new NextResponse(JSON.stringify({err: error.message}), {
            status: 500,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            }
        });
    }
}