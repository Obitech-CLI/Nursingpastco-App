"use server";

import { cookies } from "next/headers";

export async function POST() {

    const cookieStore = await cookies();

    try {
        cookieStore.delete("adminToken");

        return Response.json({
            sucess: true,
            message: "logged out",
        }, {status: 200})

    } catch (err) {
        console.error(err);
        return Response.json({
            success: false,
            error: "server error",
        },{status: 500})
    }
}