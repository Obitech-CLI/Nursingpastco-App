"use server";

import { CreateAdminType } from "@/types/admin";
import { supabase } from "../supabase/supabase";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const CreateAdmin = async ({firstname, lastname, email, password}:CreateAdminType) =>
{
    const SECRET = process.env.JWT_SECRET!;

    if (!firstname || !lastname || !email || !password) {
        return { success: false, error: "empty input fields", status: 400 }
    }

    const { data: existingAdmin, error: existingAdminError } = await supabase
    .from("nursingpastco_admin")
    .select("email")
    .eq("email", email)
    .single();

    if (!existingAdmin || existingAdminError) {

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data: admin, error } = await supabase
        .from("nursingpastco_admin")
        .insert({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword
        })
        .select("id")
        .single();

        if (error) {
            return { success: false, error: "failed to create account", status: 500 }
        }

        const adminToken = jwt.sign(
            {id: admin?.id},
            SECRET,
            {expiresIn: "1hr"}
        )

        if (!adminToken) {
            return { success: false, error: "an unexpected error occured. please try again", status: 500 }
        }

        return { success: true, message: "acoount created success", status: 201, token: adminToken }

    }

    return { success: false, error: "admin already exists", status: 409 }
}

export default CreateAdmin;