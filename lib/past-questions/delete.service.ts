"use server";

import { supabase } from "../supabase/supabase";

const DeletePastQuestion = async (id: string) =>
{
    if (!id) {
        return { 
            success: false, 
            error: "invalid request", 
            status: 403 
        }
    }

    const { data: pastQuestion, error: pastQuestionError } = await supabase
    .from("nursingpastco_pastQuestions")
    .select("pdf")
    .eq("id", id)
    .single();

    if (!pastQuestion || pastQuestionError) {
        return {
            success: false,
            status: 500,
            error: "failed to fetch past question pdf url, try again"
        }
    }

    const pdfUrl = pastQuestion.pdf;
    const path = decodeURIComponent(pdfUrl.split("/nursingpastco_pdfs/")[1]);

    const { error: storageError } = await supabase.storage
    .from("nursingpastco_pdfs")
    .remove([path])

    if (storageError) {
        return {
            success: false,
            status: 500,
            error: "storage failed to remove past question pdf"
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
        message: "past question deleted success"
    }
}

export default DeletePastQuestion;