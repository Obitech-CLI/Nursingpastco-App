import DeleteCourse from "@/lib/courses/delete.service";
import DeleteNewsService from "@/lib/news/delete.service";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest, {params}:{params: Promise<{id:string}>}) {

    const { id } = await params;

    try {
        const res = await DeleteNewsService(id);

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
        })
    }
}