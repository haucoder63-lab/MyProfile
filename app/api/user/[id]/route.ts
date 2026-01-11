import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/model/User";

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

export async function PUT(req: Request, params: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const id  = await params;
    const body = await req.json();
    try {
        const { ...updateBody } = body;
        const updatingUser = await User.findByIdAndUpdate(
            id,
            updateBody,
            {new: true}
        )
        return new NextResponse(JSON.stringify(updatingUser), {
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

export async function DELETE(req: Request, params: { params: Promise<{ id: string }> }) {
    await dbConnect();
    try {
        const id = await params;
        const deletingUser = await User.findByIdAndDelete(id);
        return new NextResponse(JSON.stringify(deletingUser),{
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
