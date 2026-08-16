"use server";

import { supabase } from "../supabase/supabase";

const GetAllCourses = async (level: string) =>
{
    if (!level) {
        const { data, error } = await supabase
        .from("nursingpastco_courses")
        .select("id, instituition, course, level")
        .order("created_at", {ascending: false});
    
        if (data?.length === 0 || error) {
            return { success: false, error: "no course found", status: 404 }
           }

        return {
           success: true,
           allCourses: data,
           status: 200
        }
    }

    const { data, error } = await supabase
    .from("nursingpastco_courses")
    .select("id, instituition, course, level")
    .eq("level", level)
    .order("created_at", {ascending: false});
    

    if (data?.length === 0 || error) {
        return { success: false, error: "no course found", status: 404 }
    }

    return {
        success: true,
        allCourses: data,
        status: 200
    }
}

export default GetAllCourses;