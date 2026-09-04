"use server";

import { supabase } from "../supabase/supabase";

type Props = {
    category: string;
    title: string;
    news: string;
    image: File;
}

const AddNewsService = 
async ({category, title, image: file, news}: Props) =>
{
    
    if (!category || !title || !news) {
        return { success: false, error: "empty input field", status: 400 }
    }

    if (!file) {
        return { success: false, error: "no file uploaded", status: 404 }
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error: storageError } = await supabase.storage
    .from("nursingpastco_news_images")
    .upload(`News/${category}/${fileName}`, file, {
        contentType: file.type
    });

    if (storageError) throw new Error("storage failed to save file");

    const { data: fileUrl } = supabase.storage
    .from("nursingpastco_news_images")
    .getPublicUrl(`News/${category}/${fileName}`);

    const { error: insertError } = await supabase
    .from("nursingpastco_news")
    .insert({
        category: category,
        title: title,
        news: news,
        image: fileUrl.publicUrl
    });

    if (insertError) throw new Error("failed to add news/update, try again");

    return {
        success: true,
        message: "news/update added success",
        status: 201
    }
}

export default AddNewsService;