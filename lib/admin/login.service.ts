"use server";

import { LoginAdminType } from "@/types/admin";
import { supabase } from "../supabase/supabase";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const LoginAdmin = async ({email, password}:LoginAdminType) =>
{
    const SECRET = process.env.JWT_SECRET!;

    if (!email || !password) {
        return { success: false, error: "empty input fields", status: 400 }
    }

    const { data: admin, error: adminError } = await supabase
    .from("nursingpastco_admin")
    .select("*")
    .eq("email", email)
    .single();

    if (!admin || adminError) {
        return { success: false, error: "admin not found", status: 404 }
    }

    const matchPassword = await bcrypt.compare(password, admin.password);

    if (!matchPassword) {
        return { success: false, error: "incorrect password", status: 403 }
    }

    const adminToken = jwt.sign(
        {id: admin?.id},
        SECRET,
        {expiresIn: "1hr"}
    )

    if (!adminToken) {
        return { success: false, error: "an unexpected error occured. please try again", status: 500 }
    }

    return { success: true, message: "login success", status: 200, token: adminToken }
}

export default LoginAdmin;