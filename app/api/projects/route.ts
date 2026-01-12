import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Project from "@/model/Project";
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
        
        // Check if user is authenticated
        const token = getTokenFromRequest(request);
        let user = null;
        
        if (token) {
            user = await getUserFromToken(token);
        }
        
        let projects;
        if (user && user.role === 'admin') {
            // Admin can see all projects
            projects = await Project.find({}).populate('user_id', 'fullname email').sort({createdAt: -1}).lean().exec();
        } else if (user) {
            // Authenticated user can see only their own projects
            projects = await Project.find({ user_id: user.id }).populate('user_id', 'fullname email').sort({createdAt: -1}).lean().exec();
        } else {
            // Public access - show all projects for portfolio viewing
            projects = await Project.find({}).populate('user_id', 'fullname email').sort({createdAt: -1}).lean().exec();
        }
        
        return new NextResponse(JSON.stringify(projects), {
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

export const POST = withAuth(async (request: NextRequest, user) => {
    try {
        await dbConnect();
        const body = await request.json();
        const {
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
        
        const project = await Project.create({
            user_id: user.id,
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
});