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

    {/* updating instituition without a new logo file */}
    if (!file) {

        const { data: instituition, error: instituitionError } = await supabase
    .from("nursingpastco_instituitions")
    .select("instituition_name")
    .eq("id", id)
    .single();

    if (!instituition || instituitionError) {
        return {
            success: false,
            status: 500,
            error: "failed to fetch instituition for courses and pastquestions"
        }
    }
        
        const { error: updateInstituitionError } = await supabase
        .from("nursingpastco_instituitions")
        .update({
        instituition_name: instituition_name,
        instituition_abbr: instituition_abbr,
        })
        .eq("id", id);

        if (updateInstituitionError) {
            return {
                success: false,
                error: "failed to update instuition, try again",
                status: 500
            }
        }

        //updating instituition names for courses
        const { error: updateCourseError } = await supabase
        .from("nursingpastco_courses")
        .update({
        instituition: instituition_name,
        })
        .eq("instituition", instituition.instituition_name);

        if (updateCourseError) {
            return {
             success: true,
             message: "failed to update courses instuitions, try again",
             status: 500
            }
        }

        //updating instituition names for past-questions
        const { error: updatePastQuestionsError } = await supabase
        .from("nursingpastco_pastQuestions")
        .update({
        instituition: instituition_name,
        })
        .eq("instituition", instituition.instituition_name);

        if (updatePastQuestionsError) {
            return {
             success: true,
             message: "failed to update past-questions instuitions, try again",
             status: 500
            }
        }

        return {
        success: true,
        message: "instituition update success",
        status: 201
        }

    }

    //fetch the logo file path
    const { data: instituitionLogoUrl, error: instituitionLogoUrlError } = await supabase
    .from("nursingpastco_instituitions")
    .select("instituition_logo, instituition_name")
    .eq("id", id)
    .single();

    if (!instituitionLogoUrl || instituitionLogoUrlError) {
        return {
            success: false,
            status: 500,
            error: "failed to fetch logo url"
        }
    }

    //delete the old logo from both db and storage
    const deleteUrl = instituitionLogoUrl.instituition_logo;
    const path = deleteUrl.split("/Logos")[1];

    const { error: storageDeleteError } = await supabase.storage
    .from("nursingpastco_images")
    .remove([path])

    if (storageDeleteError) {
        return {
            success: false,
            status: 500,
            error: "failed to remove previous logo url from storage"
        }
    }

        //Updating instituition with a new file logo

        const fileName = `${Date.now()}-${file.name}`;

        const { error: storageError } = await supabase.storage
        .from("nursingpastco_images")
        .upload(`Logos/${fileName}`, file, {
        contentType: file.type
        });

        if (storageError) {
            return {
             success: true,
             message: "failed to save new logo to storage, try again",
             status: 500
            }
        }

        const { data: logoUrl } = supabase.storage
        .from("nursingpastco_images")
        .getPublicUrl(`Logos/${fileName}`);

        const { error: updateInstituitionError } = await supabase
        .from("nursingpastco_instituitions")
        .update({
        instituition_name: instituition_name,
        instituition_abbr: instituition_abbr,
        instituition_logo: logoUrl.publicUrl
        })
        .eq("id", id);

        if (updateInstituitionError) {
            return {
             success: true,
             message: "failed to update instuition, try again",
             status: 500
            }
        }

        //updating instituition names for courses
        const { error: updateCourseError } = await supabase
        .from("nursingpastco_courses")
        .update({
        instituition: instituition_name,
        })
        .eq("instituition", instituitionLogoUrl.instituition_name);

        if (updateCourseError) {
            return {
             success: true,
             message: "failed to update courses instuitions, try again",
             status: 500
            }
        }

        //updating instituition names for past-questions
        const { error: updatePastQuestionsError } = await supabase
        .from("nursingpastco_pastQuestions")
        .update({
        instituition: instituition_name,
        })
        .eq("instituition", instituitionLogoUrl.instituition_name);

        if (updatePastQuestionsError) {
            return {
             success: true,
             message: "failed to update past-questions instuitions, try again",
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