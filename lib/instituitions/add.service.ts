"use server";

import { redis } from "../redis";
import { supabase } from "../supabase/supabase";

type InstituitionDataProps = {
  instituition_name: string;
  instituition_abbr: string;
  instituition_logo: File;
};

const AddInstituition = async ({
  instituition_name,
  instituition_abbr,
  instituition_logo,
}: InstituitionDataProps) => {
  const file = instituition_logo;

  if (!instituition_name || !instituition_abbr) {
    return { success: false, error: "empty input field", status: 400 };
  }

  if (!file) {
    return { success: false, error: "no file uploaded", status: 404 };
  }

  const fileName = `${Date.now()}-${file.name}`;

  const { error: storageError } = await supabase.storage
    .from("nursingpastco_images")
    .upload(`Logos/${fileName}`, file, {
      contentType: file.type,
    });

  if (storageError) {
    return {
      success: false,
      error: "failed to save image file to storage. try again",
      status: 500,
    };
  }

  const { data: logoUrl } = supabase.storage
    .from("nursingpastco_images")
    .getPublicUrl(`Logos/${fileName}`);

  const { error: insertError } = await supabase
    .from("nursingpastco_instituitions")
    .insert({
      instituition_name: instituition_name,
      instituition_abbr: instituition_abbr,
      instituition_logo: logoUrl.publicUrl,
    });

  if (insertError) {
    return {
      success: false,
      error: "failed to add instuition, try again",
      status: 500,
    };
  }

  return {
    success: true,
    message: "instituition added success",
    status: 201,
  };
};

export default AddInstituition;
