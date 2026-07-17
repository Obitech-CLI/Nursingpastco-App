import CreateAdmin from "@/lib/admin/create.service";
import { CreateAdminType } from "@/types/admin";
import { cookies } from "next/headers";

export async function POST(req:Request) {

    const cookieStore = await cookies();

    const body:CreateAdminType = await req.json();

    const firstname = body.firstname;
    const lastname = body.lastname;
    const email = body.email;
    const password = body.password;

    try {
        const res = await CreateAdmin({firstname, lastname, email, password});

        if (!res?.success) {
            return Response.json({
                success: res?.success,
                error: res?.error,
            },{status: res?.status})
        }

        cookieStore.set("adminToken", res?.token as string, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path:"/"
        });

        return Response.json({
            success: res?.success,
            message: res?.message,
        },{status: res?.status})

    } catch (err) {
        console.error(err);
        return Response.json({
            success: false,
            error: "server error",
        },{status: 500})
    }
}