"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { supabase } from "../supabase/supabase";

const StrictUserAuth = async () =>
{
    const cookieStore = await cookies();
    const SECRET = process.env.JWT_SECRET!;

    const token = cookieStore.get("userToken")?.value;

    if (!token) {
        return redirect("/");
    }

    let decoded: JwtPayload;
    try {
        decoded = jwt.verify(token, SECRET) as JwtPayload;
        if (!decoded) {
            cookieStore.delete("userToken");
        }
    } catch (err) {
        console.error(err);
        return redirect("/");
        
    }

    if (!decoded) return redirect("/admin/login");

    const { data: user, error } = await supabase
    .from("nursingpastco_user")
    .select("id, role, active")
    .eq("id", decoded.id)
    .single();

    if (!user || error) return redirect("/");

    if (user.role !== "user") return redirect("/");

    if (!user.active) return redirect("/");

    return user;
}

export default StrictUserAuth;