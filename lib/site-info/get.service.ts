"use server";

import { supabase } from "../supabase/supabase";

const GetSiteInfo = async (category:string) =>
{
    const { data, error } = await supabase
    .from("nursingpastco_site_info")
    .select("*")
    .eq("category", category)
    .order("created_at", {ascending: false});
    

    if (data?.length === 0 || error) {
        return { success: false, error: "no site info found", status: 404 }
    }

    return {
        success: true,
        siteInfo: data,
        status: 200
    }
}

export default GetSiteInfo;