"use server";

import { supabase } from "../supabase/supabase";

const DeleteNewsService = async (id: string) =>
{
    if (!id) {
        return {
            success: false,
            error: "invalid request",
            status: 400
        }
    }

    const { data: news, error: newsError } = await supabase
    .from("nursingpastco_news")
    .select("category, image")
    .eq("id", id)
    .single();

    if (!news || newsError) {
        return {
            success: false,
            error: "couldnt get news image url. try again",
            status: 500
        }
    }

    const fileUrl = news.image;
    const path = decodeURIComponent(fileUrl.split("/nursingpastco_news_images/")[1]);

    const { error: storageError } = await supabase.storage
    .from("nursingpastco_news_images")
    .remove([path])

    if (storageError) {
        return {
            success: false,
            status: 500,
            error: "storage failed to remove news image from storage"
        }
    }

    const { error } = await supabase
    .from("nursingpastco_news")
    .delete()
    .eq("id", id);

    if (error) {
        return {
            success: false,
            error: "failed to delete news, try again",
            status: 500
        }
    }

    return {
        success: true,
        message: "news deleted success",
        status: 200
    }
}

export default DeleteNewsService;