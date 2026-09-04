"use server";

import { supabase } from "../supabase/supabase";

type Props = {
    category: string;
    title: string;
    content: string;
    file: File;
}

const AddContentService = 
async ({category, title, file, content}: Props) =>
{
    
    if (!category || !title || !content) {
        return { success: false, error: "empty input field", status: 400 }
    }

    if (!file) {
        return { success: false, error: "no file uploaded", status: 404 }
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error: storageError } = await supabase.storage
    .from("nursingpastco_contents_files")
    .upload(`Contents/${category}/${fileName}`, file, {
        contentType: file.type
    });

    if (storageError) throw new Error("storage failed to save file");

    const { data: fileUrl } = supabase.storage
    .from("nursingpastco_contents_files")
    .getPublicUrl(`Contents/${category}/${fileName}`);

    const { error: insertError } = await supabase
    .from("nursingpastco_contents")
    .insert({
        category: category,
        title: title,
        content: content,
        file: fileUrl.publicUrl
    });

    if (insertError) throw new Error("failed to add content, try again");

    return {
        success: true,
        message: "content added success",
        status: 201
    }
}

export default AddContentService;