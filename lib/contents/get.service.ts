"use server";

import { supabase } from "../supabase/supabase";

const GetContentsService = async (category: string) => 
{
    const { data, error } = await supabase
    .from("nursingpastco_contents")
    .select("id, category, title, content, file, created_at")
    .eq("category", category)

    if (data?.length === 0 || error) {
        return {
            success: false,
            error: "no content found",
            status: 404
        }
    }

    return {
        success: true,
        contents: data,
        status: 200
    }
}

export default GetContentsService;