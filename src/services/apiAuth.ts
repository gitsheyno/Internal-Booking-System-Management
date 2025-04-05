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

export async function getCurrentUser(){
   const {data : session} = await supabase.auth.getSession();
   if(!session){
    return null;
   }

   const {data, error} = await supabase.auth.getUser();
   console.log("user", data);
    if (error){
     throw new Error(error.message);
    }

    return data?.user
}

export async function logout() {
    const {error} = await supabase.auth.signOut()

    if(error){
        throw new Error(error.message);
    }
}