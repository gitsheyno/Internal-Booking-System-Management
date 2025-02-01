import supabase from "./supabase";
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
  image?: string | null;
}) {
  const { data, error } = await supabase
    .from("cabins")
    .insert(newCabin)
    .select();

  if (error) {
    console.error(error);
    throw new Error("An error occurred while creating cabins");
  }
}
