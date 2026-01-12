import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import About from "@/model/About";

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

export async function GET() {
    await dbConnect();
    try {
        const about = await About.find({}).populate('user_id', 'fullname email');
        return new NextResponse(JSON.stringify(about), {
            status: 200,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            }
        });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({err: error.message}), {
            status: 500,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            }
        });
    }
}

export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();
    
    try {
        const about = new About(body);
        await about.save();
        
        return new NextResponse(JSON.stringify(about), {
            status: 201,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            }
        });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({err: error.message}), {
            status: 500,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            }
        });
    }
}