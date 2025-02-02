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

export async function createCabin(newCabin: {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount?: number;
  description?: string;
  image?: FileList | null;
}) {
  console.log(newCabin, "check");

  const imageName = newCabin.image
    ? `${Math.random()}-${(newCabin.image[0].name as string).replaceAll(
        "/",
        ""
      )}`
    : "";

  const imagePath = `${supabaseUrl}/storage/v1/object/public/Hotel/${imageName}`;

  /**
   * Create a new cabin
   */
  const { data, error } = await supabase
    .from("cabins")
    .insert({ ...newCabin, image: imagePath })
    .select();

  if (error) {
    console.error(error);
    throw new Error("An error occurred while creating cabins");
  }

  /**
   * Upload the image
   */
  if (newCabin.image) {
    const { error: uploadError } = await supabase.storage
      .from("Hotel")
      .upload(imageName, newCabin.image[0]);

    if (uploadError) {
      await supabase.from("cabins").delete().eq("id", data[0].id);

      throw new Error("An error occurred while uploading the image");
    }
  }
}
