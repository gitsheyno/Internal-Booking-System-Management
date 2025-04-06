import { useMutation , useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateUserData } from "../services/apiAuth";

export function useUpdateUserInfo(){
    const queryClient = useQueryClient();

    const {mutate : updateUserInfo, isPending, isSuccess, isError} = useMutation({
        mutationFn: updateUserData,
        onSuccess: ({user}) => {
            toast.success("User data updated successfully");

            queryClient.setQueryData(['user'],user)
            queryClient.invalidateQueries({
                queryKey: ["user"]
            });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return {updateUserInfo, isPending, isSuccess, isError};
}