import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Education from "@/model/Educations";

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
    dbConnect();
    try {
        const educations = await Education.find({}).sort({createdAt: -1});
        return new NextResponse(JSON.stringify(educations), {
            status: 200,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            }
        })

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

export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();
    const {user_id, school_name, start_year, end_year, description } = body;
    try {
        const education = await Education.create({
            user_id: user_id, 
            school_name: school_name, 
            start_year: start_year, 
            end_year: end_year,
            description: description
        })
        return new NextResponse(JSON.stringify(education), {
            status: 200,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            }
        })

    }catch(error: any) {
          return new NextResponse(JSON.stringify({err: error.message}), {
            status: 500,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            }
        })
    }
}