"use server";

import { PastQuestionDataTypes } from "@/types/types";
import { supabase } from "../supabase/supabase";

const AddPastQuestionService = async ({instituition, course, level, title, pdf}:PastQuestionDataTypes) =>
{
    if (!instituition || !course || !level) {
        return { success: false, error: "empty input field", status: 400 }
    }

    if (!pdf) {
        return { success: false, error: "no pdf uploaded", status: 400 }
    }

    const pdfName = `${Date.now()}-${pdf.name}`;

    const { error: storageError } = await supabase.storage
    .from("nursingpastco_pdfs")
    .upload(`PDFs/${instituition}/${level}/${level}/${pdfName}`, pdf, {
        contentType: pdf.type
    });

    if (storageError) {
        return { success: false, error: "failed to save pdf file, try again", status: 500 }
    }

    const { data: pdfUrl } = supabase.storage
    .from("nursingpastco_pdfs")
    .getPublicUrl(`PDFs/${instituition}/${level}/${level}/${pdfName}`)

    const { error: insertError } = await supabase
    .from("nursingpastco_pastQuestions")
    .insert({
        instituition: instituition,
        course: course,
        level: level,
        title: title,
        pdf: pdfUrl.publicUrl
    });

    if (insertError) {
        return { success: false, error: "failed to add past question file, try again", status: 500 }
    }

    return {
        success: true,
        message: "pastQuestion added success",
        status: 201
    }
}

export default AddPastQuestionService;