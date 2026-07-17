"use server";

import { FetchAdmin } from "@/lib/admin/admin";
import AdminAuth from "@/lib/admin/admin.auth";

export async function GET() {

    const admin = await AdminAuth();

    try {
        const res = await FetchAdmin(admin.id);

        if (!res.success) {
            return Response.json({
                success: res.success,
            },{status: res.status})
        }

        return Response.json({
            success: res.success,
            admin: res.admin,
        },{status: res.status})

    } catch (err) {
        console.error(err);
        return Response.json({
            error: "server error"
        },{status: 500})
    }
}