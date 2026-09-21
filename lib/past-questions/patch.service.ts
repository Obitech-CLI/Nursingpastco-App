"use server";

import { supabase } from "../supabase/supabase";

type Props = {
    id: string;
    instituition: string;
    course: string;
    level: string;
    pdf: File;
}

const UpdatePastQuestion = 
async ({id, instituition, course, level, pdf}:Props) =>
{

    if (!id) {
        return { success: false, error: "invalid request", status: 403 }
    }

    if (!instituition || !course || !level) {
        return { success: false, error: "empty input field", status: 400 }
    }

    if (!pdf) {
        
        const { error: updateError } = await supabase
        .from("nursingpastco_pastQuestions")
        .update({
        instituition: instituition,
        course: course,
        level: level,
        })
        .eq("id", id);

        if (updateError) {
            return {
                success: false,
                error: "failed to update past questions, try again",
                status: 500
            }
        }

        return {
        success: true,
        message: "past question update success",
        status: 201
        }

    }

    //DELETE THE OLD PDF FROM STORAGE BEFORE REPLACING

    //Fetch the pdf url and use the path to delete storage
    const { data: pdfUrl, error: pdfUrlError } = await supabase
    .from("nursingpastco_pastQuestions")
    .select("pdf")
    .eq("id", id)
    .single();

    if (!pdfUrl || pdfUrlError) {
        return {
            success: false,
            status: 500,
            error: "failed to fetch pdf url"
        }
    }

    //get the file path
    const fileUrl = pdfUrl.pdf;
    const path = fileUrl.split("/nursingpastco_pdfs")[1];

    //use the file path and delete from storage
    const { error: storageDeleteError } = await supabase.storage
    .from("nursingpastco_pdfs")
    .remove([path])

    if (storageDeleteError) {
        return {
            success: false,
            status: 500,
            error: "failed to remove previous pdf file from storage"
        }
    }

    //ADD THE NEW PDF FILE TO STORAGE
    const pdfName = `${Date.now()}-${pdf.name}`;

    const { error: storageError } = await supabase.storage
    .from("nursingpastco_pdfs")
    .upload(`PDFs/${instituition}/${level}/${course}/${pdfName}`, pdf, {
    contentType: pdf.type
    });

    if (storageError) {
        return {
            success: true,
            message: "failed to save new pdf file to storage, try again",
            status: 500
        }
    }

    const { data: Url } = supabase.storage
    .from("nursingpastco_pdfs")
    .getPublicUrl(`PDFs/${instituition}/${level}/${course}/${pdfName}`);

    const title = pdf.name.slice(0, -3);

    const { error: updateError } = await supabase
    .from("nursingpastco_pastQuestions")
    .update({
        instituition: instituition,
        title: title,
        course: course,
        level: level,
        pdf: Url.publicUrl
    })
    .eq("id", id);

    if (updateError) {
        return {
            success: true,
            message: "failed to update past question, try again",
            status: 500
        }
    }


    return {
       success: true,
       message: "past question update success",
       status: 200
    }
    
}

export default UpdatePastQuestion;