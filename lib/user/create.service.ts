"use server";

import { CreateUserType } from "@/types/user";
import { supabase } from "../supabase/supabase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const CreateUser = async ({firstname, lastname, email, instituition, password, terms}:CreateUserType) =>
{
    const SECRET = process.env.JWT_SECRET!;

    if (!firstname || !lastname || !email || !instituition || !password) {
        return { success: false, error: "empty input fields", status: 400 }
    }

    if (!terms) {
        return { success: false, error: "accept terms and conditions to continue", status: 400 }
    }

    const { data: existingUser, error: existingUserError } = await supabase
    .from("nursingpastco_user")
    .select("email")
    .eq("email", email)
    .single();

    if (!existingUser || existingUserError) {

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data: user, error } = await supabase
        .from("nursingpastco_user")
        .insert({
            firstname: firstname,
            lastname: lastname,
            email: email,
            instituition: instituition,
            password: hashedPassword,
        })
        .select("*")
        .single();

        if (error) {
            return { success: false, error: "failed to create account, try again", status: 500 }
        }

        const userToken = jwt.sign(
            {id: user.id},
            SECRET,
            {expiresIn: "1hr"}
        )

        return { 
            success: true, 
            message: "account created success", 
            status: 201, token: 
            userToken,
            user: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            instituition: user.instituition,
            }
        }

    }

    return { success: false, error: "user already exists", status: 409 }
}

export default CreateUser;