import LoginUser from "@/lib/user/login.service";
import { LoginUserType } from "@/types/user";
import { cookies } from "next/headers";

export async function POST(req:Request) {

    const cookieStore = await cookies();

    const body:LoginUserType = await req.json();

    const email = body.email;
    const password = body.password;

    try {
        const res = await LoginUser({email, password});

        if (!res?.success) {
            return Response.json({
                success: res.success,
                error: res.error,
            },{status: res.status})
        }

        cookieStore.set("userToken", res?.token as string, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path:"/"
        })

        return Response.json({
            success: res.success,
            message: res.message,
            user: res.user
        },{ status: res.status})

    } catch (err) {
        console.error(err);
        return Response.json({
            success: false,
            error: "server error",
        },{status: 500})
    }
}