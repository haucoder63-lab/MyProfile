import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Project from "@/model/Project";
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
            try {
                user = await getUserFromToken(token);
            } catch (error) {
                console.log('Invalid token, proceeding with public access');
                user = null;
            }
        }
        
        let projects;
        if (user && user.role === 'admin') {
            projects = await Project.find({}).populate('user_id', 'fullname email').sort({createdAt: -1}).lean().exec();
        } else if (user) {
            projects = await Project.find({ user_id: user.id }).populate('user_id', 'fullname email').sort({createdAt: -1}).lean().exec();
        } else {
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

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const token = getTokenFromRequest(request);
        if (!token) {
            return new NextResponse(JSON.stringify({err: 'Authentication required'}), {
                status: 401,
                headers: {
                    ...CORS_HEADERS,
                    "Content-Type": "application/json",
                }
            });
        }

        let user;
        try {
            user = await getUserFromToken(token);
            if (!user) {
                return new NextResponse(JSON.stringify({err: 'Invalid token'}), {
                    status: 401,
                    headers: {
                        ...CORS_HEADERS,
                        "Content-Type": "application/json",
                    }
                });
            }
        } catch (error) {
            return new NextResponse(JSON.stringify({err: 'Invalid token'}), {
                status: 401,
                headers: {
                    ...CORS_HEADERS,
                    "Content-Type": "application/json",
                }
            });
        }

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
            user_id: user?.id,
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
}