"use server";

import { supabase } from "../supabase/supabase";

const AddContentsCategoryService = async (category: string) =>
{
    if (!category) {
        return {
            success: false,
            error: "empty category field",
            status: 400
        }
    }

    const { data: existingCategory, error: existingCategoryError } = await supabase
    .from("nursingpastco_contents_categories")
    .select("category")
    .eq("category", category)
    .single();

    if (!existingCategory || existingCategoryError) {

        const { error: insertError } = await supabase
        .from("nursingpastco_contents_categories")
        .insert({
            category: category
        });

        if (insertError) {
            return {
                success: false,
                error: "failed to add category, try again",
                status: 500
            }
        }


        return {
            success: true,
            message: "category added success",
            status: 201
        }

    }

    return {
        success: false,
        error: "category already exists",
        status: 409
    }
}

export default AddContentsCategoryService;