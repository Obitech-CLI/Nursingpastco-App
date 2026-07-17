"use server";

import { supabase } from "../supabase/supabase";

type Props = {
    instituition: string;
    course: string;
    level: string;
}

const AddCourse = async ({instituition, course, level}:Props) =>
{
    if (!instituition || !course || !level) {
        return { success: false, error: "empty input field", status: 400 }
    }

    const { error: insertError } = await supabase
    .from("nursingpastco_courses")
    .insert({
        instituition: instituition,
        course: course,
        level: level,
    });

    if (insertError) {
        return { success: false, error: "failed to add course, try again", status: 500 }
    }

    return {
        success: true,
        message: "course added success",
        status: 201
    }
}

export default AddCourse;