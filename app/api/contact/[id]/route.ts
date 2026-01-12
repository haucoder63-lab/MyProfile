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

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;
    try {
        const contact = await Contact.findById(id).populate('user_id', 'fullname email');
        if (!contact) {
            return new NextResponse(JSON.stringify({err: "Contact not found"}), {
                status: 404,
                headers: {
                    ...CORS_HEADERS,
                    "Content-Type": "application/json",
                }
            });
        }
        
        return new NextResponse(JSON.stringify(contact), {
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

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    
    try {
        const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
        if (!contact) {
            return new NextResponse(JSON.stringify({err: "Contact not found"}), {
                status: 404,
                headers: {
                    ...CORS_HEADERS,
                    "Content-Type": "application/json",
                }
            });
        }
        
        return new NextResponse(JSON.stringify(contact), {
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

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;
    
    try {
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return new NextResponse(JSON.stringify({err: "Contact not found"}), {
                status: 404,
                headers: {
                    ...CORS_HEADERS,
                    "Content-Type": "application/json",
                }
            });
        }
        
        return new NextResponse(JSON.stringify({message: "Contact deleted successfully"}), {
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