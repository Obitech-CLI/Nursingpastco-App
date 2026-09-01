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

    const { error: deleteInstituitionError } = await supabase
    .from("nursingpastco_instituitions")
    .delete()
    .eq("id", id)

    if (deleteInstituitionError) {
        return {
          success: false,
          status: 500,
          error: "failed to delete instituition"
       }
    }

    const { error: deleteCoursesError } = await supabase
    .from("nursingpastco_courses")
    .delete()
    .eq("instituition", instituition.instituition_name)

    if (deleteCoursesError) {
        return {
          success: false,
          status: 500,
          error: "failed to delete instituition courses"
       }
    }

    //delete pastquestions from storage

    const { data: pastQuestion, error: pastQuestionError } = await supabase
    .from("nursingpastco_pastQuestions")
    .select("instituition, level, pdf")
    .eq("instituition", instituition.instituition_name)
    .single();

    if (!pastQuestion || pastQuestionError) {
        return {
            success: false,
            status: 500,
            error: "failed to get instituition pastQuestion"
        }
    }

    const pastQuestionUrl = pastQuestion.pdf;
    const pastQuestionPath = pastQuestionUrl.split(`PDFs/${pastQuestion.instituition}/${pastQuestion.level}/${pastQuestion.level}/`)[1];

    const { error: pastQuestionStorageError } = await supabase.storage
    .from("nursingpastco_pdfs")
    .remove([pastQuestionPath])

    if (pastQuestionStorageError) {
        return {
            success: false,
            status: 500,
            error: "storage failed to remove pdfs"
        }
    }

    const { error: deletePastQuestionsError } = await supabase
    .from("nursingpastco_pastQuestions")
    .delete()
    .eq("instituition", instituition.instituition_name)

    if (deletePastQuestionsError) {
        return {
          success: false,
          status: 500,
          error: "failed to delete instituition past-questions"
       }
    }

    return {
        success: true,
        status: 200,
        message: "deleted success"
    }
}

export default DeleteInstituition;