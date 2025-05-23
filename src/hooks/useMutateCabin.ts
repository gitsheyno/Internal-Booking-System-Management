import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useMutationHandler<T, V>(
  mutateFunction: (data: T) => Promise<V>,
  successMessage: string,
  errorMessage: string,
  queryKey: string
) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: mutateFunction,
    onSuccess: () => {
      toast.success(successMessage);
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
    },
    onError: (error) => {
      toast.error(errorMessage || error.message);
    },
  });

  return { mutate, isPending, isSuccess, isError };
}
