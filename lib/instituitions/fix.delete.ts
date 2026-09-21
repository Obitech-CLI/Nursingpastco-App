"use server";

import { redis } from "../redis";
import { supabase } from "../supabase/supabase";

const DeleteInstituitionFix = async () => {
  const deleted = await redis.get("deletedInstituition");
  const instituition = await redis.get("instituitionDeletedName");

  const fixedCourses = await redis.get("fixedInstituitionDeleteCourses");
  const fixedPastQuestions = await redis.get(
    "fixedInstituitionDeletePastQuestions",
  );

  if (!deleted) {
    return {
      success: false,
      error: "no fix available",
      status: 500,
    };
  }

  if (!fixedCourses) {
    const { error: deleteCourseError } = await supabase
      .from("nursingpastco_courses")
      .delete()
      .eq("instituition", instituition);

    if (deleteCourseError) {
      return {
        success: false,
        error: "failed to fix instituition courses. try again",
        status: 500,
      };
    }

    await redis.set("fixedInstituitionDeleteCourses", true);
  }

  if (!fixedPastQuestions) {
    const { error: deleteError } = await supabase
      .from("nursingpastco_pastQuestions")
      .delete()
      .eq("instituition", instituition);

    if (deleteError) {
      return {
        success: false,
        status: 500,
        message: "failed to fix instituition past questions. try again",
      };
    }

    await redis.set("fixedInstituitionDeletePastQuestions", true);
  }

  await redis.del(
    "deletedInstituition",
    "instituitionDeletedName",
    "fixedInstituitionDeletePastQuestions",
    "fixedInstituitionDeleteCourses",
  );

  return {
    success: true,
    status: 200,
    message: "fix success",
  };
};

export default DeleteInstituitionFix;
