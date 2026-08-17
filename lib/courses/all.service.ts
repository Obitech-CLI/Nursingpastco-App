"use server";

import { supabase } from "../supabase/supabase";

const GetAllCourses = async (level: string, search: string) =>
{
    if (!level && !search) {
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
    } else if (level && !search) {
        const { data, error } = await supabase
        .from("nursingpastco_courses")
        .select("id, instituition, course, level")
        .eq("level", level)
        .order("created_at", {ascending: false});
    

        if (data?.length === 0 || error) {
            return { success: false, error: "no course found for this level", status: 404 }
            }

        return {
        success: true,
        allCourses: data,
        status: 200
        }
    } else if (level && search) {
        const { data, error } = await supabase
        .from("nursingpastco_courses")
        .select("id, instituition, course, level")
        .eq("level", level)
        .ilike("course", `${search}%`)
        .order("created_at", {ascending: false});
    

        if (data?.length === 0 || error) {
            return { success: false, error: "no match found for this level", status: 404 }
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
    .ilike("course", `${search}%`)
    .order("created_at", {ascending: false});
    

    if (data?.length === 0 || error) {
        return { success: false, error: "no match found", status: 404 }
    }

    return {
        success: true,
        allCourses: data,
        status: 200
    }
}

export default GetAllCourses;