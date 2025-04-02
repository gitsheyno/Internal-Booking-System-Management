import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({bookingId, breakfast} : {bookingId : number, breakfast ?: {hasBreakfast : boolean, extrasPrice : number, totalPrice : number}}) => updateBooking(bookingId, {
      status: "checked-in",
      isPaid: true,
      ...breakfast,
    }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (error) => {
      toast.error("Could not check in booking");
    },
  });
  
  return { checkin, isCheckingIn };
}