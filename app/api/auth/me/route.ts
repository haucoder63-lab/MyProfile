import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/middleware";

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

export const GET = withAuth(async (request: NextRequest, user) => {
    return NextResponse.json(
        {
            user: {
                id: user.id,
                email: user.email,
                fullname: user.fullname,
                role: user.role
            }
        },
        {
            status: 200,
            headers: CORS_HEADERS
        }
    );
});