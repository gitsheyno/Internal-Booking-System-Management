import supabase from "./supabase";

type LoginParams = {
    email: string;
    password: string;
}
export async function login({email,password}:LoginParams) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error){
        throw new Error(error.message);
    }

    return data
}