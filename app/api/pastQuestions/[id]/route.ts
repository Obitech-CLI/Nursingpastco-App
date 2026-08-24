import DeletePastQuestion from "@/lib/past-questions/delete.service";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest, {params}:{params: Promise<{id:number}>}) {

    const { id } = await params;

    try {
        const res = await DeletePastQuestion(id);

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