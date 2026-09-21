"use server";

import { error } from "console";
import { supabase } from "../supabase/supabase";

type Props = {
    id: string;
    category: string;
    title: string;
    content: string;
    file: File;
}

const UpdateContentService = 
async ({id, category, title, content, file}:Props) =>
{

    if (!id) {
        return { success: false, error: "invalid request", status: 403 }
    }

    if (!category || !title || !content) {
        return { success: false, error: "empty input field", status: 400 }
    }

    if (!file) {
        return { success: false, error: "no file uploaded", status: 400 }
    }

    if (!file) {
        
        const { error: updateError } = await supabase
        .from("nursingpastco_contents")
        .update({
        category: category,
        title: title,
        content: content,
        })
        .eq("id", id);

        if (updateError) {
            return {
                success: false,
                error: "failed to update contents, try again",
                status: 500
            }
        }

        return {
        success: true,
        message: "content update success",
        status: 201
        }

    }

    //DELETE THE OLD PDF FROM STORAGE BEFORE REPLACING

    //Fetch the pdf url and use the path to delete storage
    const { data: contentUrl, error: contentUrlError } = await supabase
    .from("nursingpastco_contents")
    .select("file")
    .eq("id", id)
    .single();

    if (!contentUrl || contentUrlError) {
        return {
            success: false,
            status: 500,
            error: "failed to fetch content file url"
        }
    }

    //get the file path
    const fileUrl = contentUrl.file;
    const path = decodeURIComponent(fileUrl.split("/nursingpastco_contents_files"))[1];

    //use the file path and delete from storage
    const { error: storageDeleteError } = await supabase.storage
    .from("nursingpastco_contents_file")
    .remove([path])

    if (storageDeleteError) {
        return {
            success: false,
            status: 500,
            error: "failed to remove previous content file from storage"
        }
    }

    //ADD THE NEW PDF FILE TO STORAGE
    const pdfName = `${Date.now()}-${file.name}`;

    const { error: storageError } = await supabase.storage
    .from("nursingpastco_contents_files")
    .upload(`Contents/${category}/${pdfName}`, file, {
    contentType: file.type
    });

    if (storageError) {
        return {
            success: true,
            message: "failed to save new content file to storage, try again",
            status: 500
        }
    }

    const { data: Url } = supabase.storage
    .from("nursingpastco_contents_files")
    .getPublicUrl(`Contents/${category}/${pdfName}`);


    const { error: updateError } = await supabase
    .from("nursingpastco_contents")
    .update({
        category: category,
        title: title,
        content: content,
        file: Url.publicUrl
    })
    .eq("id", id);

    if (updateError) {
        return {
            success: true,
            message: "failed to update content, try again",
            status: 500
        }
    }


    return {
       success: true,
       message: "content update success",
       status: 200
    }
    
}

export default UpdateContentService;