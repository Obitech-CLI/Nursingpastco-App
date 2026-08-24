"use server";

import { supabase } from "../supabase/supabase";

const DeletePastQuestion = async (id: number) =>
{
    const { data: pastQuestion, error: pastQuestionError } = await supabase
    .from("nursingpastco_pastQuestions")
    .select("id, instituition, course, level, pdf")
    .eq("id", id)
    .single();

    if (!pastQuestion || pastQuestionError) {
        return {
            success: false,
            status: 500,
            error: "failed to get past question"
        }
    }

    const pdfUrl = pastQuestion.pdf;
    const path = pdfUrl.split(`PDFs/${pastQuestion.instituition}/${pastQuestion.level}/${pastQuestion.level}/`)[1];

    const { error: storageError } = await supabase.storage
    .from("nursingpastco_pdfs")
    .remove([path])

    if (storageError) {
        return {
            success: false,
            status: 500,
            error: "storage failed to remove logo"
        }
    }

    const { error: deleteError } = await supabase
    .from("nursingpastco_pastQuestions")
    .delete()
    .eq("id", id)

    if (deleteError) {
        return {
          success: false,
          status: 500,
          message: "failed to delete past question"
       }
    }

    return {
        success: true,
        status: 200,
        message: "deleted success"
    }
}

export default DeletePastQuestion;