"use server";

import { error } from "console";
import { supabase } from "../supabase/supabase";

type Props = {
    id: string;
    category: string;
    title: string;
    recommendation: string;
    image: File;
    link: string;
}

const UpdateRecommendationService = 
async ({id, category, title, recommendation, image, link}:Props) =>
{

    if (!id) {
        return { success: false, error: "invalid request", status: 403 }
    }

    if (!category || !title || !recommendation) {
        return { success: false, error: "empty input field", status: 400 }
    }

    if (!image) {
        return { success: false, error: "no image uploaded", status: 400 }
    }

    if (!image) {
        
        const { error: updateError } = await supabase
        .from("nursingpastco_recommendations")
        .update({
        category: category,
        title: title,
        recommendation: recommendation,
        link: link
        })
        .eq("id", id);

        if (updateError) {
            return {
                success: false,
                error: "failed to update recommendation, try again",
                status: 500
            }
        }

        return {
        success: true,
        message: "recommendation update success",
        status: 201
        }

    }

    //DELETE THE OLD PDF FROM STORAGE BEFORE REPLACING

    //Fetch the pdf url and use the path to delete storage
    const { data: recommendUrl, error: recommendUrlError } = await supabase
    .from("nursingpastco_recommendations")
    .select("image")
    .eq("id", id)
    .single();

    if (!recommendUrl || recommendUrlError) {
        return {
            success: false,
            status: 500,
            error: "failed to fetch recommendation image url"
        }
    }

    //get the file path
    const fileUrl = recommendUrl.image;
    const path = decodeURIComponent(fileUrl.split("/nursingpastco_recommends_images"))[1];

    //use the file path and delete from storage
    const { error: storageDeleteError } = await supabase.storage
    .from("nursingpastco_recommends_images")
    .remove([path])

    if (storageDeleteError) {
        return {
            success: false,
            status: 500,
            error: "failed to remove previous recommendation image from storage"
        }
    }

    //ADD THE NEW PDF FILE TO STORAGE
    const fileName = `${Date.now()}-${image.name}`;

    const { error: storageError } = await supabase.storage
    .from("nursingpastco_recommends_images")
    .upload(`Recommends/${category}/${fileName}`, image, {
    contentType: image.type
    });

    if (storageError) {
        return {
            success: true,
            message: "failed to save new recommendation image to storage, try again",
            status: 500
        }
    }

    const { data: Url } = supabase.storage
    .from("nursingpastco_recommends_images")
    .getPublicUrl(`Recommends/${category}/${fileName}`);


    const { error: updateError } = await supabase
    .from("nursingpastco_recommendations")
    .update({
        category: category,
        title: title,
        recommendation: recommendation,
        image: Url.publicUrl,
        link: link
    })
    .eq("id", id);

    if (updateError) {
        return {
            success: true,
            message: "failed to update recommendation, try again",
            status: 500
        }
    }


    return {
       success: true,
       message: "recommendation update success",
       status: 200
    }
    
}

export default UpdateRecommendationService;