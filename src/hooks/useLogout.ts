import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout(){
const navigate = useNavigate()
const queryClient = useQueryClient();

    const { mutate : logoutMutate, isPending: isLoggingOut } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.removeQueries()
            navigate("/login", {replace: true});
        },
    });

    return { logoutMutate, isLoggingOut };
}