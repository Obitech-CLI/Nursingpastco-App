"use server";

import { LevelOptions } from "@/ui/AppContent";
import { supabase } from "../supabase/supabase";

type Props = {
    id: string;
    instituition: string;
    course: string;
    level: string;
}

const UpdateCourse = async ({id, instituition, course, level}:Props) =>
{
    if (!id) {
        return { success: false, error: "invalid request", status: 403 }
    }

    if (!instituition || !course || !level) {
        return { success: false, error: "empty input field", status: 400 }
    }

    const { data, error: courseError } = await supabase
    .from("nursingpastco_courses")
    .select("instituition, course, level")
    .eq("id", id)
    .single();

    if (!data || courseError) {
        return { success: false, error: "failed to fetch course, try again", status: 500 }
    }

    const { error: updateCoursesError } = await supabase
    .from("nursingpastco_courses")
    .update({
        instituition: instituition,
        course: course,
        level: level,
    })
    .eq("id", id);

    if (updateCoursesError) {
        return { success: false, error: "failed to update course, try again", status: 500 }
    }

    const { error: updatePastQuestionsError } = await supabase
    .from("nursingpastco_pastQuestions")
    .update({
        instituition: instituition,
        course: course,
        level: level,
    })
    .eq("instituition", data.instituition)
    .eq("course", data.course)
    .eq("level", data.level)

    if (updatePastQuestionsError) {
        return { success: false, error: "failed to update course past-question, try again", status: 500 }
    }

    return {
        success: true,
        message: "course updated success",
        status: 201
    }
}

export default UpdateCourse;