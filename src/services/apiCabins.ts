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
  image?: string | null;
  maxCapacity: number | null;
  name: string | null;
  regularPrice: number | null;
};

export async function createCabin(newCabin: NewCabin | EditCabin, id?: number) {
  let imageName: string = "";
  console.log(newCabin.image);

  const hasImagePath = (newCabin.image as string)?.startsWith?.(supabaseUrl);

  if (newCabin.image instanceof FileList) {
    imageName = newCabin.image
      ? `${Math.random()}-${newCabin.image[0].name.replaceAll("/", "")}`
      : "";
  }

  const imagePath = hasImagePath
    ? (newCabin.image as string)
    : `${supabaseUrl}/storage/v1/object/public/Hotel/${imageName}`;

  let query;
  console.log(id, "iddddd?");
  if (!(newCabin as EditCabin).id) {
    query = supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();
    console.log("here");
  } else {
    console.log("there");

    query = supabase
      .from("cabins")
      .update({
        ...newCabin,
        image: imagePath,
      })
      .eq("id", (newCabin as EditCabin).id)
      .select()
      .single();
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("An error occurred while creating or updating cabins");
  }

  if (!data) {
    console.warn("No rows were affected. Check if the ID exists.");
  }

  console.log("Affected row:", data);

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
