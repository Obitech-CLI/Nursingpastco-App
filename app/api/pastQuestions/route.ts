"use server";

import AddPastQuestionService from "@/lib/past-questions/add.service";
import GetPastQuestions from "@/lib/past-questions/get.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

    const formData = await req.formData();

    const instituition = formData.get("instituition") as string;
    const course = formData.get("course") as string;
    const level = formData.get("level") as string;
    const title = formData.get("title") as string;
    const pdf = formData.get("pdf") as File;

    try {
        const res = await AddPastQuestionService({instituition, course, level, title, pdf});

        if(!res.status) {
            return NextResponse.json({
                success: res.success,
                error: res.error
            },{status: res.status})
        }

        return NextResponse.json({
            success: res.success,
            message: res.message
        },{status: res.status})

    } catch (err) {
        console.error(err);
        return NextResponse.json({
            error: "server error",
        },{status: 500})
    }
}

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;

    const instituition = searchParams.get("instituition") as string;
    const level = searchParams.get("level") as string;
    const course = searchParams.get("course") as string;
    
    try {
        const res = await GetPastQuestions(instituition, level, course);

        if (!res.success) {
            return NextResponse.json({
                success: res.success,
                error: res.error
            },{status: res.status});
        }

        return NextResponse.json({
            success: res.success,
            pastQuestions: res.pastQuestions
        },{status: res.status});

    } catch (err) {
        console.error(err);
        return NextResponse.json({
            error: "server error",
            status: 500
        })
    }
}