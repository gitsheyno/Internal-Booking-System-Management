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

type SignupParams = {
    fullName: string;
    email: string;
    password: string;
}

export async function signup({fullName,email, password}:SignupParams) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options:{
            data:{
                fullName,
                avatar:""
            }
        }
    })
    if (error){
        throw new Error(error.message);
    }
    return data
}

export async function updateUserData({fullName, avatar, password}: {fullName: string; avatar: string, password : string}) {

    const updateData: { password?: string; data?: { fullName: string; avatar?: string } } = {};

    if (password) {
        updateData.password = password;
    }

    if (fullName) {
        updateData.data = {
            fullName,
            avatar
        };
    }

    const {data, error} = await supabase.auth.updateUser(
        updateData
    )
    if (error){
        throw new Error(error.message); 
    }
    if(!avatar){
        return data
    }

    const fileName = `avatar=${data.user?.id}-${Math.random()}`
    return data
}