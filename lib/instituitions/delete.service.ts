"use server";

import { redis } from "../redis";
import { supabase } from "../supabase/supabase";

const DeleteInstituition = async (id: string) => {
  const deleted = await redis.get("deletedInstituition");

  if (deleted) {
    return {
      success: false,
      error: "fix previous delete to continue",
      delete: true,
      status: 500,
    };
  }

  const { data: instituition, error: instituitionError } = await supabase
    .from("nursingpastco_instituitions")
    .select("instituition_logo, instituition_name")
    .eq("id", id)
    .single();

  if (!instituition || instituitionError) {
    return {
      success: false,
      status: 500,
      error: "failed to get instituition logo url. try again",
    };
  }

  const logoUrl = instituition.instituition_logo;
  const path = decodeURIComponent(logoUrl.split("/nursingpastco_images/")[1]);

  const { error: storageError } = await supabase.storage
    .from("nursingpastco_images")
    .remove([path]);

  if (storageError) {
    return {
      success: false,
      error: "failed to remove logo file from storage. try again",
      status: 500,
    };
  }

  const { error: deleteInstituitionError } = await supabase
    .from("nursingpastco_instituitions")
    .delete()
    .eq("id", id);

  if (deleteInstituitionError) {
    return {
      success: false,
      status: 500,
      error: "failed to delete instituition. try again",
    };
  }

  await redis.set("deletedInstituition", true);
  await redis.set("instituitionDeletedName", instituition.instituition_name);

  return {
    success: true,
    status: 200,
    message: "instituition deleted success",
  };
};

export default DeleteInstituition;
