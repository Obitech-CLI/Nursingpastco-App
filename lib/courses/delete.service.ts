"use server";

import { supabase } from "../supabase/supabase";

const DeleteCourse = async (id: number) =>
{
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

    return {
        success: true,
        status: 200,
        message: "course deleted success"
    }
}

export default DeleteCourse;