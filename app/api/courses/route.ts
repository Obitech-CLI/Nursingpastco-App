import AddCourse from "@/lib/courses/add.service";
import GetCourses from "@/lib/courses/get.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const instituition = body.instituition;
    const course = body.course;
    const level = body.level;

    try {
        const res = await AddCourse({instituition, course, level});

        if (!res.success) {
            return Response.json({
                success: res.success,
                error: res.error
            },{status: res.status});
        }

        return Response.json({
            success: res.success,
            message: res.message
        },{status: res.status});

    } catch (err) {
        console.error(err);
        return Response.json({
            error: "server error"
        },{status: 500})
    }
}

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;

    const instituition = searchParams.get("instituition") as string;
    const level = searchParams.get("level") as string;
    
    try {
        const res = await GetCourses(instituition, level);

        if (!res.success) {
            return NextResponse.json({
                success: res.success,
                error: res.error
            },{status: res.status});
        }

        return NextResponse.json({
            success: res.success,
            courses: res.courses
        },{status: res.status});

    } catch (err) {
        console.error(err);
        return NextResponse.json({
            error: "server error",
            status: 500
        })
    }
}