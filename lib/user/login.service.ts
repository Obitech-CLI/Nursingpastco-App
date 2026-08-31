"use server";

import { LoginUserType } from "@/types/user";
import { supabase } from "../supabase/supabase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const LoginUser = async ({email, password}:LoginUserType) =>
{
    const SECRET = process.env.JWT_SECRET!;

    if (!email || !password) {
        return { success: false, error: "empty input fields", status: 400 }
    }

    const { data: user, error: userError } = await supabase
    .from("nursingpastco_user")
    .select("*")
    .eq("email", email)
    .single();

    if (!user || userError) {
        return { success: false, error: "user not found", status: 404 }
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
        return { success: false, error: "incorrect password", status: 403 }
    }

    const userToken = jwt.sign(
        {id: user.id},
        SECRET,
        {expiresIn: "1hr"}
    )

    return { 
        success: true, 
        message: "login success", 
        status: 200, token: 
        userToken,
        user: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            instituition: user.instituition,
        }
    }
}

export default LoginUser;