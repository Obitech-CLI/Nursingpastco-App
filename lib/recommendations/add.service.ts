"use server";

import { supabase } from "../supabase/supabase";

type Props = {
    category: string;
    title: string;
    recommendation: string;
    link: string;
    image: File;
}

const AddRecommendationsService = 
async ({category, title, image: file, recommendation, link}: Props) =>
{
    
    if (!category || !title || !recommendation || !link) {
        return { success: false, error: "empty input field", status: 400 }
    }

    if (!file) {
        return { success: false, error: "no file uploaded", status: 404 }
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error: storageError } = await supabase.storage
    .from("nursingpastco_recommends_images")
    .upload(`Recommends/${category}/${fileName}`, file, {
        contentType: file.type
    });

    if (storageError) throw new Error("storage failed to save file");

    const { data: fileUrl } = supabase.storage
    .from("nursingpastco_Recommends_images")
    .getPublicUrl(`Recommends/${category}/${fileName}`);

    const { error: insertError } = await supabase
    .from("nursingpastco_recommendations")
    .insert({
        category: category,
        title: title,
        recommendation: recommendation,
        link: link,
        image: fileUrl.publicUrl
    });

    if (insertError) throw new Error("failed to add recommendation, try again");

    return {
        success: true,
        message: "content added success",
        status: 201
    }
}

export default AddRecommendationsService;