"use server";

import { supabase } from "../supabase/supabase";

const DeleteCourse = async (id: string) =>
{
    const { data: course, error: courseError } = await supabase
    .from("nursingpastco_courses")
    .select("instituition, level, course")
    .eq("id", id)
    .single();

    if (!course || courseError) {
        return {
            success: false,
            status: 500,
            error: "failed to fetch courses"
        }
    }

    const { error: deleteError } = await supabase
    .from("nursingpastco_courses")
    .delete()
    .eq("id", id)

    if (deleteError) {
        return {
          success: false,
          status: 500,
          error: "failed to delete course"
       }
    }

    //delete past-question related to course
    const { data: pastQuestion, error: pastQuestionError } = await supabase
    .from("nursingpastco_pastQuestions")
    .select("instituition, level, pdf")
    .eq("instituition", course.instituition)
    .eq("level", course.level)
    .eq("course", course.course)
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
            error: "storage failed to remove course pdfs"
        }
    }

    const { error: deletePastQuestionsError } = await supabase
    .from("nursingpastco_pastQuestions")
    .delete()
    .eq("course", course.course )

    if (deletePastQuestionsError) {
        return {
          success: false,
          status: 500,
          error: "failed to delete course past-questions"
       }
    }

    return {
        success: true,
        status: 200,
        message: "course deleted success"
    }
}

export default DeleteCourse;