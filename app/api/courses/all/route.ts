import GetAllCourses from "@/lib/courses/all.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;
    const level = searchParams.get("selectedLevel") as string;
    const search = searchParams.get("search") as string;
    
    try {
        const res = await GetAllCourses(level, search);

        if (!res.success) {
            return NextResponse.json({
                success: res.success,
                error: res.error
            },{status: res.status});
        }

        return NextResponse.json({
            success: res.success,
            allCourses: res.allCourses
        },{status: res.status});

    } catch (err) {
        console.error(err);
        return NextResponse.json({
            error: "server error",
            status: 500
        })
    }
}