"use server";

import { supabase } from "../supabase/supabase";

const GetRecommendationsCategoriesService = async () => 
{
    const { data, error } = await supabase
    .from("nursingpastco_recommendations_categories")
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

export default GetRecommendationsCategoriesService;