import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

  export function useCheckout() { 
  const queryClient = useQueryClient();
  const navigate =  useNavigate();
    
  const { mutate: checkOut, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId:number) => updateBooking( bookingId, {
      status: "checked-out",
    }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been checked out`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (error) => {
      toast.error("Could not check out booking");
    },
  });
  
  return { checkOut, isCheckingOut };
}