"use server";

import { redis } from "../redis";
import { supabase } from "../supabase/supabase";

const UpdateInstituitionFix = async () => {
  const updated = await redis.get("updatedInstituition");
  const oldInstituitionName = await redis.get("oldUpdatedInstituitionName");
  const newInstituitionName = await redis.get("newUpdatedInstituitionName");

  const fixedCourses = await redis.get("fixedInstituitionUpdateCourses");
  const fixedPastQuestions = await redis.get(
    "fixedInstituitionUpdatePastQuestions",
  );

  if (!updated) {
    return {
      success: false,
      error: "no fix available",
      status: 500,
    };
  }

  if (!fixedCourses) {
    const { error: updateCoursesError } = await supabase
      .from("nursingpastco_courses")
      .update({
        instituition: newInstituitionName,
      })
      .eq("instituition", oldInstituitionName);

    if (updateCoursesError) {
      return {
        success: false,
        error: "failed to fix instituition courses. try again",
        status: 500,
      };
    }

    await redis.set("fixedInstituitionUpdateCourses", true);
  }

  if (!fixedPastQuestions) {
    const { error: updateError } = await supabase
      .from("nursingpastco_pastQuestions")
      .update({
        instituition: newInstituitionName,
      })
      .eq("instituition", oldInstituitionName);

    if (updateError) {
      return {
        success: false,
        error: "failed to fix instituition past questions. try again",
        status: 500,
      };
    }

    await redis.set("fixedInstituitionUpdatePastQuestions", true);
  }

  await redis.del(
    "updatedInstituition",
    "oldUpdatedInstituitionName",
    "newUpdatedInstituitionName",
    "fixedInstituitionUpdatePastQuestions",
    "fixedInstituitionUpdateCourses",
  );

  return {
    success: true,
    message: "fix success",
    status: 201,
  };
};

export default UpdateInstituitionFix;
