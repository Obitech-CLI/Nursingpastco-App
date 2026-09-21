"use server";

import { supabase } from "../supabase/supabase";

const DeleteRecommendationsService = async (id: string) =>
{
    if (!id) {
        return {
            success: false,
            error: "invalid request",
            status: 400
        }
    }

    const { data: recommendations, error: recommendationsError } = await supabase
    .from("nursingpastco_recommendations")
    .select("category, image")
    .eq("id", id)
    .single();

    if (!recommendations || recommendationsError) {
        return {
            success: false,
            error: "couldnt get recommendation image url. try again",
            status: 500
        }
    }

    const fileUrl = recommendations.image;
    const path = decodeURIComponent(fileUrl.split("/nursingpastco_recommends_images/")[1]);

    const { error: storageError } = await supabase.storage
    .from("nursingpastco_recommends_images")
    .remove([path])

    if (storageError) {
        return {
            success: false,
            status: 500,
            error: "storage failed to remove recommendation image from storage"
        }
    }

    const { error } = await supabase
    .from("nursingpastco_recommendations")
    .delete()
    .eq("id", id);

    if (error) {
        return {
            success: false,
            error: "failed to delete recommendation, try again",
            status: 500
        }
    }

    return {
        success: true,
        message: "recommendation deleted success",
        status: 200
    }
}

export default DeleteRecommendationsService;