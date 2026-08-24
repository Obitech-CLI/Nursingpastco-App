"use server";

import { supabase } from "../supabase/supabase";

const DeleteInstituition = async (id: string) =>
{
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

    const logoUrl = instituition.instituition_logo;
    const path = logoUrl.split("/Logos")[1];

    const { error: storageError } = await supabase.storage
    .from("nursingpastco_images")
    .remove([path])

    if (storageError) {
        return {
            success: false,
            status: 500,
            error: "storage failed to remove logo"
        }
    }

    const { error: deleteError } = await supabase
    .from("nursingpastco_instituitions")
    .delete()
    .eq("id", id)

    if (deleteError) {
        return {
          success: false,
          status: 500,
          error: "failed to delete"
       }
    }

    return {
        success: true,
        status: 200,
        message: "deleted success"
    }
}

export default DeleteInstituition;