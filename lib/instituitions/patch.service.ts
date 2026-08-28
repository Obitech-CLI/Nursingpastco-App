"use server";

import { error } from "console";
import { supabase } from "../supabase/supabase";

type InstituitionDataProps = {
    id: string;
    instituition_name: string;
    instituition_abbr: string;
    instituition_logo: File;
}

const UpdateInstituition = 
async ({id, instituition_name, instituition_abbr, instituition_logo}:InstituitionDataProps) =>
{
    const file = instituition_logo;

    if (!id) {
        return { success: false, error: "invalid request", status: 403 }
    }

    if (!instituition_name || !instituition_abbr) {
        return { success: false, error: "empty input field", status: 400 }
    }

    if (!file) {
        
        const { error: updateError } = await supabase
        .from("nursingpastco_instituitions")
        .update({
        instituition_name: instituition_name,
        instituition_abbr: instituition_abbr,
        })
        .eq("id", id);

        if (updateError) {
            return {
                success: false,
                error: "failed to update instuition, try again",
                status: 500
            }
        }

        return {
        success: true,
        message: "instituition update success",
        status: 201
        }

    }   

    const { data: instituition, error: instituitionError } = await supabase
    .from("nursingpastco_instituitions")
    .select("instituition_name, instituition_logo")
    .eq("id", id)
    .single();

    if (!instituition || instituitionError) {
        return {
            success: false,
            status: 500,
            error: "failed to get instituition"
        }
    }

    const deleteUrl = instituition.instituition_logo;
    const path = deleteUrl.split("/Logos")[1];

    const { error: storageDeleteError } = await supabase.storage
    .from("nursingpastco_images")
    .remove([path])

    if (storageDeleteError) {
        return {
            success: false,
            status: 500,
            error: "storage failed to remove old logo"
        }
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

        const { error: updateError } = await supabase
        .from("nursingpastco_instituitions")
        .update({
        instituition_name: instituition_name,
        instituition_abbr: instituition_abbr,
        instituition_logo: logoUrl.publicUrl
        })
        .eq("id", id);

        if (updateError) {
            return {
             success: true,
             message: "failed to update instuition, try again",
             status: 500
            }
        }

        return {
        success: true,
        message: "instituition update success",
        status: 201
        }
    
}

export default UpdateInstituition;