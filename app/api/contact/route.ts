import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Contact from "@/model/Contact";

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
        const contact = await Contact.find({}).populate('user_id', 'fullname email');
        return new NextResponse(JSON.stringify(contact), {
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
        const contact = new Contact(body);
        await contact.save();
        
        return new NextResponse(JSON.stringify(contact), {
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