"use server";

import { supabase } from "../supabase/supabase";
import AdminAuth from "./admin.auth";

export const FetchAdmin = async (adminId:number) =>
{
    await AdminAuth();

    const { data: admin, error } = await supabase
    .from("nursingpastco_admin")
    .select("id, firstname, lastname, email")
    .eq("id", adminId)
    .single();

    if (!admin || error) {
        return { success: false, status: 404 }
    }

    return { success: true, status: 200, admin }
}