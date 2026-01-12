import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
    try {
        await dbConnect();
        return NextResponse.json({ status: "healthy", timestamp: new Date().toISOString() });
    } catch (error) {
        return NextResponse.json({ status: "unhealthy", error: "Database connection failed" }, { status: 500 });
    }
}