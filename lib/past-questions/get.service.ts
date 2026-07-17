"use server";

import { supabase } from "../supabase/supabase";

const GetPastQuestions = async (instituition:string, level:string, course:string) =>
{
    const { data, error } = await supabase
    .from("nursingpastco_pastQuestions")
    .select("id, instituition, course, level, title")
    .eq("instituition", instituition)
    .eq("level", level)
    .eq("course", course)
    .order("created_at", {ascending: false});
    

    if (data?.length === 0 || error) {
        return { success: false, error: "no course found", status: 404 }
    }

    return {
        success: true,
        pastQuestions: data,
        status: 200
    }
}

export default GetPastQuestions;