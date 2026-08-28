"use server";

import { supabase } from "../supabase/supabase";

type Props = {
    category: string;
    title: string;
    sub_title: string;
    information: string;
}

const AddSiteInfo = 
async ({category, title, sub_title, information}:Props) =>
{

    if (!category) {
        return { success: false, error: "empty category", status: 400 }
    }

    if (title || sub_title || information) {

        const { error: insertError } = await supabase
        .from("nursingpastco_site_info")
        .insert({
           category: category,
           title: title,
           sub_title: sub_title,
           information: information,
        });

        if (insertError) throw new Error("failed to add site info, try again");

        return {
           success: true,
           message: "site info added success",
           status: 201
        }
        
    } else {
        return {
           success: false,
           error: "complete atleast one input field",
           status: 400
        }
    }
}

export default AddSiteInfo;