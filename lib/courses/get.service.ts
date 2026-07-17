"use server";

import { supabase } from "../supabase/supabase";

const GetCourses = async (instituition:string, level:string) =>
{
    const { data, error } = await supabase
    .from("nursingpastco_courses")
    .select("id, instituition, course, level")
    .eq("instituition", instituition)
    .eq("level", level)
    .order("created_at", {ascending: false});
    

    if (data?.length === 0 || error) {
        return { success: false, error: "no course found", status: 404 }
    }

    return {
        success: true,
        courses: data,
        status: 200
    }
}

export default GetCourses;