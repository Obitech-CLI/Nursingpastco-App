"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { supabase } from "../supabase/supabase";

const AdminAuth = async () =>
{
    const cookieStore = await cookies();
    const SECRET = process.env.JWT_SECRET!;

    const token = cookieStore.get("adminToken")?.value;

    if (!token) {
        return redirect("/admin/login");
    }

    let decoded: JwtPayload;
    try {
        decoded = jwt.verify(token, SECRET) as JwtPayload;
        if (!decoded) { 
            cookieStore.delete("adminToken") 
        }
    } catch (err) {
        console.error(err);
        return redirect("/admin/login");
        
    }

    if (!decoded) return redirect("/admin/login");

    const { data: admin, error } = await supabase
    .from("nursingpastco_admin")
    .select("id, role")
    .eq("id", decoded.id)
    .single();

    if (!admin || error) return redirect("/admin/login");

    if (admin.role !== "admin") return redirect("/");

    return admin;
}

export default AdminAuth;