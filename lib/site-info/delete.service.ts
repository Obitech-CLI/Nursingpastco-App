"use server";

import { supabase } from "../supabase/supabase";

const DeleteSiteInfo = async (id: string, category: string) =>
{
    const { error: deleteError } = await supabase
    .from("nursingpastco_site_info")
    .delete()
    .eq("id", id)
    .eq("category", category)

    if (deleteError) {
        return {
          success: false,
          status: 500,
          error: "failed to delete site info"
       }
    }

    return {
        success: true,
        status: 200,
        message: "site info deleted success"
    }
}

export default DeleteSiteInfo;