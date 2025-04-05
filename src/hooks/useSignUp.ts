import { useMutation,QueryClient } from "@tanstack/react-query";    
import { signup } from "../services/apiAuth";
import {toast} from "react-hot-toast";

export function useSignUp() {

    const queryClient = new QueryClient();
    const {  mutate: signupMutate, isPending: isSigningUp } = useMutation({
        mutationFn:({ email, password  , fullName}:{
            fullName: string;
            email: string;
            password: string;
        })=> signup({ email, password, fullName }),
        onSuccess: (user) => {
            toast.success("Sign up successful");
            // queryClient.setQueryData(['user'], user.user);
        },
})
    return { signupMutate, isSigningUp };
}