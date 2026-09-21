"use server";

import { redis } from "../redis";
import { supabase } from "../supabase/supabase";

export type Props = {
  id: string;
  instituition: string;
  course: string;
  level: string;
};

const UpdateCourse = async ({ id, instituition, course, level }: Props) => {
  if (id) {
    return {
      success: false,
      error: "invalid request",
      status: 403,
    };
  }

  if (instituition || course || level) {
    return {
      success: false,
      error: "empty input field",
      status: 400,
    };
  }

  const updated = await redis.get("updatedCourse");

  if (updated) {
    return {
      success: false,
      error: "fix previous update to continue",
      update: true,
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

  const { error: updateCoursesError } = await supabase
    .from("nursingpastco_courses")
    .update({
      instituition: instituition,
      course: course,
      level: level,
    })
    .eq("id", id);

  if (updateCoursesError) {
    return {
      success: false,
      error: "failed to update course, try again",
      status: 500,
    };
  }

  const oldData = {
    instituition: data.instituition,
    course: data.course,
    level: data.level,
  };

  const newData = {
    instituition: instituition,
    course: course,
    level: level,
  };

  await redis.set("oldUpdatedCourseData", JSON.stringify(oldData));
  await redis.set("newUpdatedCourseData", JSON.stringify(newData));

  await redis.set("updatedCourse", true);

  return {
    success: true,
    message: "course updated success",
    status: 201,
  };
};

export default UpdateCourse;
