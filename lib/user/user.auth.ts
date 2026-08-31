"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { supabase } from "../supabase/supabase";

const UserAuth = async () =>
{
    const cookieStore = await cookies();
    const SECRET = process.env.JWT_SECRET!;

    const token = cookieStore.get("userToken")?.value;

    if (!token) {
        return null;
    }

    let decoded: JwtPayload;
    try {
        decoded = jwt.verify(token, SECRET) as JwtPayload;
        if (!decoded) {
            cookieStore.delete("userToken");
        }
    } catch (err) {
        console.error(err);
        return null;
        
    }

    if (!decoded) return null;

    const { data: user, error } = await supabase
    .from("nursingpastco_user")
    .select("id, role")
    .eq("id", decoded.id)
    .single();

    if (!user || error) return null;

    if (user.role !== "user") return null;

    return user;
}

export default UserAuth;