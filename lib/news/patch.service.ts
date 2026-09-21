"use server";

import { error } from "console";
import { supabase } from "../supabase/supabase";

type Props = {
    id: string;
    category: string;
    title: string;
    news: string;
    image: File;
}

const UpdateNewsService = 
async ({id, category, title, news, image}:Props) =>
{

    if (!id) {
        return { success: false, error: "invalid request", status: 403 }
    }

    if (!category || !title || !news) {
        return { success: false, error: "empty input field", status: 400 }
    }

    if (!image) {
        return { success: false, error: "no image uploaded", status: 400 }
    }

    if (!image) {
        
        const { error: updateError } = await supabase
        .from("nursingpastco_news")
        .update({
        category: category,
        title: title,
        news: news,
        })
        .eq("id", id);

        if (updateError) {
            return {
                success: false,
                error: "failed to update news, try again",
                status: 500
            }
        }

        return {
        success: true,
        message: "news update success",
        status: 201
        }

    }

    //DELETE THE OLD PDF FROM STORAGE BEFORE REPLACING

    //Fetch the pdf url and use the path to delete storage
    const { data: newsUrl, error: newsUrlError } = await supabase
    .from("nursingpastco_news")
    .select("image")
    .eq("id", id)
    .single();

    if (!newsUrl || newsUrlError) {
        return {
            success: false,
            status: 500,
            error: "failed to fetch news image url"
        }
    }

    //get the file path
    const fileUrl = newsUrl.image;
    const path = decodeURIComponent(fileUrl.split("/nursingpastco_news_images"))[1];

    //use the file path and delete from storage
    const { error: storageDeleteError } = await supabase.storage
    .from("nursingpastco_news_images")
    .remove([path])

    if (storageDeleteError) {
        return {
            success: false,
            status: 500,
            error: "failed to remove previous news image from storage"
        }
    }

    //ADD THE NEW PDF FILE TO STORAGE
    const imgName = `${Date.now()}-${image.name}`;

    const { error: storageError } = await supabase.storage
    .from("nursingpastco_news_images")
    .upload(`News/${category}/${imgName}`, image, {
    contentType: image.type
    })

    if (storageError) {
        return {
            success: true,
            message: "failed to save news image to storage, try again",
            status: 500
        }
    }

    const { data: Url } = supabase.storage
    .from("nursingpastco_news_images")
    .getPublicUrl(`News/${category}/${imgName}`);


    const { error: updateError } = await supabase
    .from("nursingpastco_news")
    .update({
        category: category,
        title: title,
        news: news,
        image: Url.publicUrl
    })
    .eq("id", id);

    if (updateError) {
        return {
            success: true,
            message: "failed to update news, try again",
            status: 500
        }
    }


    return {
       success: true,
       message: "news update success",
       status: 200
    }
    
}

export default UpdateNewsService;