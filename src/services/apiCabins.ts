import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching cabins");
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("An error occurred while deleting cabins");
  }
}

type NewCabin = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount?: number;
  description?: string;
  image?: FileList | null;
};

type EditCabin = {
  created_at: string;
  description: string | null;
  discount: number | null;
  id: number;
  image?: string | null | FileList;
  maxCapacity: number | null;
  name: string | null;
  regularPrice: number | null;
};

export async function createCabin(newCabin: NewCabin) {
  let imageName: string = "";

  // const hasImagePath = (newCabin.image as string)?.startsWith?.(supabaseUrl);

  if (newCabin.image instanceof FileList) {
    imageName = newCabin.image
      ? `${Math.random()}-${newCabin.image[0].name.replaceAll("/", "")}`
      : "";
  }

  const imagePath = `${supabaseUrl}/storage/v1/object/public/Hotel/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("An error occurred while creating or updating cabins");
  }

  if (!data) {
    console.warn("No rows were affected. Check if the ID exists.");
  }

  if (newCabin.image instanceof FileList) {
    const { error: uploadError } = await supabase.storage
      .from("Hotel")
      .upload(imageName, newCabin.image[0]);

    if (uploadError) {
      await supabase
        .from("cabins")
        .delete()
        .eq("id", data?.id as number);
      throw new Error("An error occurred while uploading the image");
    }
  }

  return data;
}

export async function editCabin(existedCabin: EditCabin) {
  let imageName = "";
  const hasImagePath = (existedCabin.image as string)?.startsWith?.(
    supabaseUrl
  );

  if (existedCabin.image instanceof FileList) {
    imageName = existedCabin.image
      ? `${Math.random()}-${existedCabin.image[0].name.replaceAll("/", "")}`
      : "";
  }

  const imagePath = hasImagePath
    ? (existedCabin.image as string)
    : `${supabaseUrl}/storage/v1/object/public/Hotel/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .update({
      ...existedCabin,
      image: imagePath,
    })
    .eq("id", (existedCabin as EditCabin).id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("An error occurred while creating or updating cabins");
  }

  if (!data) {
    console.warn("No rows were affected. Check if the ID exists.");
  }

  if (existedCabin.image instanceof FileList) {
    const { error: uploadError } = await supabase.storage
      .from("Hotel")
      .upload(imageName, existedCabin.image[0]);

    if (uploadError) {
      await supabase
        .from("cabins")
        .delete()
        .eq("id", data?.id as number);
      throw new Error("An error occurred while uploading the image");
    }
  }

  return data;
}
