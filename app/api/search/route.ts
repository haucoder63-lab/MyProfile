import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/model/User";
import Project from "@/model/Project";
import Skill from "@/model/Skill";
import Education from "@/model/Education";
import About from "@/model/About";
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

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');
        
        if (!query || query.trim() === '') {
            return new NextResponse(JSON.stringify({
                error: 'Vui lòng nhập từ khóa tìm kiếm'
            }), {
                status: 400,
                headers: {
                    ...CORS_HEADERS,
                    "Content-Type": "application/json",
                }
            });
        }

        const searchRegex = new RegExp(query, 'i');

        const [users, projects, skills, education, about, contact] = await Promise.all([
            User.find({
                $or: [
                    { fullname: searchRegex },
                    { email: searchRegex },
                    { phone: searchRegex },
                    { address: searchRegex },
                    { specialization: searchRegex }
                ]
            }).select('-password').lean(),

            Project.find({
                $or: [
                    { title: searchRegex },
                    { description: searchRegex },
                    { role: searchRegex },
                    { github_url: searchRegex },
                    { demo_url: searchRegex },
                    { project_type: searchRegex },
                    { status: searchRegex },
                    { 'technologies.category': searchRegex },
                    { 'technologies.items': searchRegex },
                    { main_features: searchRegex },
                    { responsibilities: searchRegex },
                    { achievements: searchRegex }
                ]
            }).populate('user_id', 'fullname email').lean(),

            Skill.find({
                $or: [
                    { category: searchRegex },
                    { 'skills.name': searchRegex }
                ]
            }).populate('user_id', 'fullname email').lean(),

            Education.find({
                $or: [
                    { school: searchRegex },
                    { degree: searchRegex },
                    { field_of_study: searchRegex },
                    { description: searchRegex },
                    { achievements: searchRegex },
                    { certificates: searchRegex },
                    { activities: searchRegex }
                ]
            }).populate('user_id', 'fullname email').lean(),

            About.find({
                $or: [
                    { title: searchRegex },
                    { description: searchRegex },
                    { objectives: searchRegex },
                    { skills_focus: searchRegex },
                    { career_goals: searchRegex }
                ]
            }).populate('user_id', 'fullname email').lean(),

            Contact.find({
                $or: [
                    { email: searchRegex },
                    { phone: searchRegex },
                    { address: searchRegex },
                    { 'social_links.platform': searchRegex },
                    { 'social_links.url': searchRegex },
                    { availability: searchRegex }
                ]
            }).populate('user_id', 'fullname email').lean()
        ]);

        const results = {
            users,
            projects,
            skills,
            education,
            about,
            contact,
            total: users.length + projects.length + skills.length + education.length + about.length + contact.length
        };

        return new NextResponse(JSON.stringify({
            query: query,
            results: results,
            message: results.total > 0 ? `Tìm thấy ${results.total} kết quả` : 'Không tìm thấy kết quả nào'
        }), {
            status: 200,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
                "Cache-Control": "s-maxage=30, stale-while-revalidate=60"
            }
        });

    } catch(error: any) {
         return new NextResponse(JSON.stringify({
            error: 'Lỗi server: ' + error.message
        }), {
            status: 500,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            }
        });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        
        const body = await request.json();
        const { query, filters } = body;
        
        if (!query || query.trim() === '') {
            return new NextResponse(JSON.stringify({
                error: 'Vui lòng nhập từ khóa tìm kiếm'
            }), {
                status: 400,
                headers: {
                    ...CORS_HEADERS,
                    "Content-Type": "application/json",
                }
            });
        }

        const searchRegex = new RegExp(query, 'i');
        const searchPromises = [];

        if (!filters || filters.includes('users')) {
            searchPromises.push(
                User.find({
                    $or: [
                        { fullname: searchRegex },
                        { email: searchRegex },
                        { phone: searchRegex },
                        { address: searchRegex },
                        { specialization: searchRegex }
                    ]
                }).select('-password').lean()
            );
        } else {
            searchPromises.push(Promise.resolve([]));
        }

        if (!filters || filters.includes('projects')) {
            searchPromises.push(
                Project.find({
                    $or: [
                        { title: searchRegex },
                        { description: searchRegex },
                        { role: searchRegex },
                        { 'technologies.category': searchRegex },
                        { 'technologies.items': searchRegex },
                        { main_features: searchRegex },
                        { responsibilities: searchRegex },
                        { achievements: searchRegex }
                    ]
                }).populate('user_id', 'fullname email').lean()
            );
        } else {
            searchPromises.push(Promise.resolve([]));
        }

        if (!filters || filters.includes('skills')) {
            searchPromises.push(
                Skill.find({
                    $or: [
                        { category: searchRegex },
                        { 'skills.name': searchRegex }
                    ]
                }).populate('user_id', 'fullname email').lean()
            );
        } else {
            searchPromises.push(Promise.resolve([]));
        }

        if (!filters || filters.includes('education')) {
            searchPromises.push(
                Education.find({
                    $or: [
                        { school: searchRegex },
                        { degree: searchRegex },
                        { field_of_study: searchRegex },
                        { description: searchRegex },
                        { achievements: searchRegex },
                        { certificates: searchRegex },
                        { activities: searchRegex }
                    ]
                }).populate('user_id', 'fullname email').lean()
            );
        } else {
            searchPromises.push(Promise.resolve([]));
        }

        if (!filters || filters.includes('about')) {
            searchPromises.push(
                About.find({
                    $or: [
                        { title: searchRegex },
                        { description: searchRegex },
                        { objectives: searchRegex },
                        { skills_focus: searchRegex },
                        { career_goals: searchRegex }
                    ]
                }).populate('user_id', 'fullname email').lean()
            );
        } else {
            searchPromises.push(Promise.resolve([]));
        }

        if (!filters || filters.includes('contact')) {
            searchPromises.push(
                Contact.find({
                    $or: [
                        { email: searchRegex },
                        { phone: searchRegex },
                        { address: searchRegex },
                        { 'social_links.platform': searchRegex },
                        { 'social_links.url': searchRegex },
                        { availability: searchRegex }
                    ]
                }).populate('user_id', 'fullname email').lean()
            );
        } else {
            searchPromises.push(Promise.resolve([]));
        }

        const [users, projects, skills, education, about, contact] = await Promise.all(searchPromises);

        const results = {
            users,
            projects,
            skills,
            education,
            about,
            contact,
            total: users.length + projects.length + skills.length + education.length + about.length + contact.length
        };

        return new NextResponse(JSON.stringify({
            query: query,
            filters: filters,
            results: results,
            message: results.total > 0 ? `Tìm thấy ${results.total} kết quả` : 'Không tìm thấy kết quả nào'
        }), {
            status: 200,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
                "Cache-Control": "s-maxage=30, stale-while-revalidate=60"
            }
        });

    } catch(error: any) {
         return new NextResponse(JSON.stringify({
            error: 'Lỗi server: ' + error.message
        }), {
            status: 500,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            }
        });
    }
}