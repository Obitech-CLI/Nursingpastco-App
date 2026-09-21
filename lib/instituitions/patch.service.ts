"use server";

import { redis } from "../redis";
import { supabase } from "../supabase/supabase";

type Props = {
  id?: string;
  instituition_name?: string;
  instituition_abbr?: string;
  instituition_logo?: File;
};

const UpdateInstituition = async ({
  id,
  instituition_name,
  instituition_abbr,
  instituition_logo,
}: Props) => {
  if (!id) {
    return { success: false, error: "invalid request", status: 403 };
  }

  if (!instituition_name || instituition_abbr) {
    return { success: false, error: "empty input detected", status: 400 };
  }

  const file = instituition_logo;

  const updated = await redis.get("updatedInstituition");

  if (updated) {
    return {
      success: false,
      error: "fix previous update to continue",
      update: true,
      status: 500,
    };
  }

  const { data: instituition, error: instituitionError } = await supabase
    .from("nursingpastco_instituitions")
    .select("instituition_logo, instituition_name")
    .eq("id", id)
    .single();

  if (instituitionError) {
    return {
      success: false,
      error: "failed to update instuition, try again",
      status: 500,
    };
  }

  if (!file) {
    const { error } = await supabase
      .from("nursingpastco_instituitions")
      .update({
        instituition_name: instituition_name,
        instituition_abbr: instituition_abbr,
      })
      .eq("id", id);

    if (error) {
      return {
        success: false,
        error: "failed to update instuition, try again",
        status: 500,
      };
    }

    await redis.set("updatedInstituition", true);
    await redis.set(
      "oldUpdatedInstituitionName",
      instituition.instituition_name,
    );
    await redis.set("newUpdatedInstituitionName", instituition_name);

    return {
      success: true,
      message: "instituition update success",
      status: 201,
    };
  }

  const logoUrl = instituition.instituition_logo;
  const path = logoUrl.split("/nursingpastco_images")[1];

  const { error: storageDeleteError } = await supabase.storage
    .from("nursingpastco_images")
    .remove([path]);

  if (storageDeleteError) {
    return {
      success: false,
      error: "storage error. try again",
      status: 500,
    };
  }

  const fileName = `${Date.now()}-${file.name}`;

  const { error: storageError } = await supabase.storage
    .from("nursingpastco_images")
    .upload(`Logos/${fileName}`, file, {
      contentType: file.type,
    });

  if (storageError) {
    return {
      success: true,
      message: "failed to save new logo to storage, try again",
      status: 500,
    };
  }

  const { data: imageUrl } = supabase.storage
    .from("nursingpastco_images")
    .getPublicUrl(`Logos/${fileName}`);

  const { error } = await supabase
    .from("nursingpastco_instituitions")
    .update({
      instituition_name: instituition_name,
      instituition_abbr: instituition_abbr,
      instituition_logo: imageUrl.publicUrl,
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      error: "failed to update instuition, try again",
      status: 500,
    };
  }

  await redis.set("updatedInstituition", true);
  await redis.set("oldUpdatedInstituitionName", instituition.instituition_name);
  await redis.set("newUpdatedInstituitionName", instituition_name);

  return {
    success: true,
    message: "instituition updated success",
    status: 201,
  };
};

export default UpdateInstituition;
