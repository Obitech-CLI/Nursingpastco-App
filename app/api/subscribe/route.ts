import AdminAuth from "@/lib/admin/admin.auth";
import GetSubscribers from "@/lib/subscribe/get.service";
import Subscribe from "@/lib/subscribe/post.service";
import { NextRequest } from "next/server";

export async function POST(req: Request) {

    const body = await req.json();

    const email = body.email;

    try {
        const res = await Subscribe(email);

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
    const search = searchParams.get("search") as string;
    const p = searchParams.get("page") as string;

    const page = Number(p) || 1;

    const from = Number(page - 1) * 3;
    const to = from + 3 - 1;

    try {
        await AdminAuth();

        const res = await GetSubscribers(search, from, to);

        if (!res?.success) {
            return Response.json({
                success: res?.success,
                error: res?.error
            },{status: res?.status});
        }

        return Response.json({
            success: res.success,
            subscribers: res.subscribers
        },{status: res.status});

    } catch (err) {
        console.error(err);
        return Response.json({
            error: "server error"
        })
    }
}