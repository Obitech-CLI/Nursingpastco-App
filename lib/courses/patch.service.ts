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

    const { error: updateError } = await supabase
    .from("nursingpastco_courses")
    .update({
        instituition: instituition,
        course: course,
        level: level,
    })
    .eq("id", id);

    if (updateError) {
        return { success: false, error: "failed to update course, try again", status: 500 }
    }

    return {
        success: true,
        message: "course updated success",
        status: 201
    }
}

export default UpdateCourse;