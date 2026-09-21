"use server";

import { redis } from "../redis";
import { supabase } from "../supabase/supabase";

type Props = {
  instituition: string;
  course: string;
  level: string;
};

const UpdateCourseFix = async () => {
  const updated = await redis.get("updatedCourse");

  if (!updated) {
    return {
      success: false,
      error: "no fix available",
      status: 500,
    };
  }

  const oldData = JSON.parse(
    (await redis.get("oldUpdatedCourseData"))!,
  ) as Props;
  const newData = JSON.parse(
    (await redis.get("newUpdatedCourseData"))!,
  ) as Props;

  const { error: updateError } = await supabase
    .from("nursingpastco_pastQuestions")
    .update({
      instituition: newData.instituition,
      course: newData.course,
      level: newData.level,
    })
    .eq("instituition", oldData.instituition)
    .eq("course", oldData.course)
    .eq("level", oldData.level);

  if (updateError) {
    return {
      success: false,
      error: "failed to fix course past questions. try again",
      status: 500,
    };
  }

  await redis.del(
    "updatedCourse",
    "newUpdatedCourseData",
    "oldUpdatedCourseData",
  );

  return {
    success: true,
    message: "past question update success",
    status: 201,
  };
};

export default UpdateCourseFix;
