"use server";

import { redis } from "../redis";
import { supabase } from "../supabase/supabase";

type Props = {
  instituition: string;
  course: string;
  level: string;
};

const DeleteCourseFix = async () => {
  const deleted = await redis.get("deletedCourse");

  if (!deleted) {
    return {
      success: false,
      error: "no fix available",
      status: 500,
    };
  }

  const oldData = JSON.parse(
    (await redis.get("oldDeletedCourseData"))!,
  ) as Props;

  const { error: deleteError } = await supabase
    .from("nursingpastco_pastQuestions")
    .delete()
    .eq("instituition", oldData.instituition)
    .eq("course", oldData.course)
    .eq("level", oldData.level);

  if (deleteError) {
    return {
      success: false,
      error: "failed to fix course past questions. try again",
      status: 500,
    };
  }

  await redis.del("deletedCourse", "oldDeletedCourseData");

  return {
    success: true,
    message: "fix success",
    status: 201,
  };
};

export default DeleteCourseFix;
