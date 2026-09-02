"use server";

import { supabase } from "../supabase/supabase";

const GetNewsCategoriesService = async () => 
{
    const { data, error } = await supabase
    .from("nursingpastco_news_categories")
    .select("id, category")

    if (data?.length === 0 || error) {
        return {
            success: false,
            error: "no category found",
            status: 500
        }
    }

    return {
        success: true,
        categories: data,
        status: 200
    }
}

export default GetNewsCategoriesService;