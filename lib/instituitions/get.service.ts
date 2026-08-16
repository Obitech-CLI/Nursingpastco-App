"use server";

import { supabase } from "../supabase/supabase";

const GetInstituitions = async (instituition: string) =>
{
    if (!instituition) {
        const { data, error } = await supabase
        .from("nursingpastco_instituitions")
        .select("id, instituition_name, instituition_abbr, instituition_logo")
        .order("created_at", {ascending: false});
    
        if (data?.length === 0 || error) {
           return { success: false, error: "no instituition found", status: 404 }
           }

        return {
           success: true,
           instituitions: data,
           status: 200
        }
    }

    const { data, error } = await supabase
    .from("nursingpastco_instituitions")
    .select("id, instituition_name, instituition_abbr, instituition_logo")
    .eq("instituition_name", instituition)
    .order("created_at", {ascending: false});
    

    if (data?.length === 0 || error) {
        return { success: false, error: "no instituition found", status: 404 }
    }

    return {
        success: true,
        instituitions: data,
        status: 200
    }
}

export default GetInstituitions;