"use server";

import { supabase } from "../supabase/supabase";

const UpdateContentsCategoryService = async (id: string, category: string) =>
{
    if (!id || !category) {
        return {
            success: false,
            error: "invalid request",
            status: 400
        }
    }

    const { error: updateError } = await supabase
    .from("nursingpastco_contents_categories")
    .update({
        category: category
    })
    .eq("id", id);

    if (updateError) {
        return {
            success: false,
            error: "failed to update category, try again",
            status: 500
        }
    }


    return {
        success: true,
        message: "category updated success",
        status: 200
    }
}

export default UpdateContentsCategoryService;