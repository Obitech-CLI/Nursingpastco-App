"use server";

import { redis } from "../redis";
import { supabase } from "../supabase/supabase";

export type Props = {
  id: string;
  instituition: string;
  course: string;
  level: string;
};

const DeleteCourse = async (id: string) => {
  const deleted = await redis.get("deletedCourse");

  if (deleted) {
    return {
      success: false,
      error: "fix previous delete to continue",
      delete: true,
      status: 500,
    };
  }
  const { data, error: coursesError } = await supabase
    .from("nursingpastco_courses")
    .select("instituition, course, level")
    .eq("id", id)
    .single();

  if (coursesError) {
    return {
      success: false,
      error: "failed to fetch course, try again",
      status: 500,
    };
  }

  const { error: deleteCourseError } = await supabase
    .from("nursingpastco_courses")
    .delete()
    .eq("id", id);

  if (deleteCourseError) {
    return {
      success: false,
      error: "failed to delete course. try again",
      status: 500,
    };
  }

  const oldData = {
    instituition: data.instituition,
    course: data.course,
    level: data.level,
  };

  await redis.set("oldDeletedCourseData", JSON.stringify(oldData));

  await redis.set("deletedCourse", true);

  return {
    success: true,
    status: 200,
    message: "course deleted success",
  };
};

export default DeleteCourse;
