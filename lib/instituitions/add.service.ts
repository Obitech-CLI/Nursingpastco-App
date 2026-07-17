"use server";

import { InstituitionType } from "@/types/types";
import { error } from "console";
import { supabase } from "../supabase/supabase";

const AddInstituition = 
async ({instituition_name, instituition_abbr, instituition_logo}:InstituitionType) =>
{
    const file = instituition_logo;

    if (!instituition_name || !instituition_abbr) {
        return { success: false, error: "empty input field", status: 400 }
    }

    if (!file) {
        return { success: false, error: "no file uploaded", status: 404 }
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error: storageError } = await supabase.storage
    .from("nursingpastco_images")
    .upload(`Logos/${fileName}`, file, {
        contentType: file.type
    });

    if (storageError) throw new Error("storage failed to save file");

    const { data: logoUrl } = supabase.storage
    .from("nursingpastco_images")
    .getPublicUrl(`Logos/${fileName}`);

    const { error: insertError } = await supabase
    .from("nursingpastco_instituitions")
    .insert({
        instituition_name: instituition_name,
        instituition_abbr: instituition_abbr,
        instituition_logo: logoUrl.publicUrl
    });

    if (insertError) throw new Error("failed to add instuition, try again");

    return {
        success: true,
        message: "instituition added success",
        status: 201
    }
}

export default AddInstituition;