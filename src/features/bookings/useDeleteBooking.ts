import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBookingMutation, isPending: isDeleting } = useMutation({
    mutationFn: (bookingId: number) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({queryKey: ["bookings"]});
    },
    onError: () => {
      toast.error("An error occurred while deleting the booking");
    },
  });

  return { deleteBookingMutation, isDeleting };
}