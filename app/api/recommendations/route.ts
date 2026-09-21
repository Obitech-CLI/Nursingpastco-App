import AdminAuth from "@/lib/admin/admin.auth";
import AddRecommendationsService from "@/lib/recommendations/add.service";
import GetRecommendationsService from "@/lib/recommendations/get.service";
import UpdateRecommendationService from "@/lib/recommendations/patch.service";
import { NextRequest } from "next/server";

export async function POST(req: Request) {
    const formData = await req.formData();

    const category = formData.get("category") as string;
    const title = formData.get("title") as string;
    const recommendation = formData.get("recommendation") as string;
    const link = formData.get("link") as string;
    const image = formData.get("image") as File;

    try {
        await AdminAuth();

        const res = await AddRecommendationsService({category, title, recommendation, link, image});

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
        const res = await GetRecommendationsService(category, search, from, to);

        if (!res?.success) {
            return Response.json({
                success: res?.success,
                error: res?.error
            },{status: res?.status});
        }

        return Response.json({
            success: res.success,
            recommendations: res.recommendations
        },{status: res.status});

    } catch (err) {
        console.error(err);
        return Response.json({
            error: "server error"
        })
    }
}

export async function PATCH(req: Request) {
    const formData = await req.formData();

    const id = formData.get("id") as string;
    const category = formData.get("category") as string;
    const title = formData.get("title") as string;
    const recommendation = formData.get("recommendation") as string;
    const image = formData.get("image") as File;
    const link = formData.get("link") as string;

    try {
        await AdminAuth();
        
        const res = await UpdateRecommendationService({id, category, title, recommendation, image, link});

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