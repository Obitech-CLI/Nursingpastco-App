"use server";

import { supabase } from "../supabase/supabase";

const DeleteNewsCategoryService = async (id: string) =>
{
    if (!id) {
        return {
            success: false,
            error: "invalid request",
            status: 400
        }
    }

    const { error } = await supabase
    .from("nursingpastco_news_categories")
    .delete()
    .eq("id", id);

    if (error) {
        return {
            success: false,
            error: "failed to delete category, try again",
            status: 500
        }
    }

    return {
        success: true,
        message: "category deleted success",
        status: 200
    }
}

export default DeleteNewsCategoryService;