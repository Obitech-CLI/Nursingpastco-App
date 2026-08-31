import CreateUser from "@/lib/user/create.service";
import { CreateUserType } from "@/types/user";
import { cookies } from "next/headers";

export async function POST(req:Request) {

    const cookieStore = await cookies();

    const body:CreateUserType = await req.json();

    const firstname = body.firstname;
    const lastname = body.lastname;
    const email = body.email;
    const instituition = body.instituition;
    const password = body.password;
    const terms = body.terms;

    try {
        const res = await CreateUser({firstname, lastname, email, instituition, password, terms});

        if (!res?.success) {
            return Response.json({
                success: res?.success,
                error: res?.error,
            },{status: res?.status})
        }

        cookieStore.set("userToken", res?.token as string, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path:"/"
        });

        return Response.json({
            success: res?.success,
            message: res?.message,
            user: res.user
        },{status: res?.status})

    } catch (err) {
        console.error(err);
        return Response.json({
            success: false,
            error: "server error",
        },{status: 500})
    }
}