"use server";

import { supabase } from "../supabase/supabase";

const DeleteContentService = async (id: string) =>
{
    if (!id) {
        return {
            success: false,
            error: "invalid request",
            status: 400
        }
    }

    const { data: content, error: ContentError } = await supabase
    .from("nursingpastco_contents")
    .select("category, file")
    .eq("id", id)
    .single();

    if (!content || ContentError) {
        return {
            success: false,
            error: "couldnt get content file url. try again",
            status: 500
        }
    }

    const fileUrl = content.file;
    const path = decodeURIComponent(fileUrl.split("/nursingpastco_contents_files/")[1]);

    console.log(path)
    console.log(fileUrl)

    const { error: storageError } = await supabase.storage
    .from("nursingpastco_contents_files")
    .remove([path]);

    console.log(storageError)

    if (storageError) {
        return {
            success: false,
            status: 500,
            error: "storage failed to remove content file from storage"
        }
    }

    const { error } = await supabase
    .from("nursingpastco_contents")
    .delete()
    .eq("id", id);

    if (error) {
        return {
            success: false,
            error: "failed to delete content, try again",
            status: 500
        }
    }

    return {
        success: true,
        message: "content deleted success",
        status: 200
    }
}

export default DeleteContentService;