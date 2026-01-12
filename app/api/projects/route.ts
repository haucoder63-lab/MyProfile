import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Project from "@/model/Project";

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
    try {
        await dbConnect();
        const projects = await Project.find({}).populate('user_id', 'fullname email').sort({createdAt: -1}).lean().exec();
        return new NextResponse(JSON.stringify(projects), {
            status: 200,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
                "Cache-Control": "s-maxage=60, stale-while-revalidate=300"
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
    const {
        user_id, 
        title, 
        description,
        image_url,
        role, 
        team_size, 
        github_url, 
        demo_url, 
        start_date, 
        end_date, 
        technologies, 
        main_features, 
        responsibilities, 
        achievements, 
        project_type, 
        status, 
        grade
    } = body;
    
    try {
        const project = await Project.create({
            user_id,
            title,
            description,
            image_url,
            role,
            team_size,
            github_url,
            demo_url,
            start_date,
            end_date,
            technologies,
            main_features,
            responsibilities,
            achievements,
            project_type,
            status,
            grade
        });
        
        return new NextResponse(JSON.stringify(project), {
            status: 201,
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