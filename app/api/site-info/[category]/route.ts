import GetSiteInfo from "@/lib/site-info/get.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, {params}:{params: Promise<{category:string}>}) {

    const { category } = await params;

    try {
        const res = await GetSiteInfo(category)
        if (!res.success) {
            return Response.json({
                success: res.success,
                error: res.error
            },{status: res.status});
        }

        return Response.json({
            success: res.success,
            siteInfo: res.siteInfo
        },{status: res.status});

    } catch (err) {
        console.error(err);
        return Response.json({
            error: "server error"
        })
    }
}