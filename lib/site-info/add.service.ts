"use server";

import { supabase } from "../supabase/supabase";

type Props = {
    category: string;
    information: string;
}

const AddSiteInfo = 
async ({category, information}:Props) =>
{

    if (!category || !information) {
        return { success: false, error: "empty input field", status: 400 }
    }

    const { error: insertError } = await supabase
    .from("nursingpastco_site_info")
    .insert({
        category: category,
        information: information,
    });

    if (insertError) throw new Error("failed to add site info, try again");

    return {
        success: true,
        message: "site info added success",
        status: 201
    }
}

export default AddSiteInfo;