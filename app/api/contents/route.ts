import AddContentService from "@/lib/contents/add.service";
import GetContentsService from "@/lib/contents/get.service";
import { NextRequest } from "next/server";

export async function POST(req: Request) {
    const formData = await req.formData();

    const category = formData.get("category") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const file = formData.get("file") as File;

    try {
        const res = await AddContentService({category, title, content, file});

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
    const category = searchParams.get("category") as string;
    const search = searchParams.get("search") as string;
    const p = searchParams.get("page") as string;

    const page = Number(p) || 1;

    const from = Number(page - 1) * 3;
    const to = from + 3 - 1;

    try {
        const res = await GetContentsService(category, search, from, to);

        if (!res?.success) {
            return Response.json({
                success: res?.success,
                error: res?.error
            },{status: res?.status});
        }

        return Response.json({
            success: res.success,
            contents: res.contents
        },{status: res.status});

    } catch (err) {
        console.error(err);
        return Response.json({
            error: "server error"
        })
    }
}