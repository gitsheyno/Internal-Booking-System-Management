import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
const queryClient = useQueryClient();
const navigate = useNavigate();
    const { mutatue : checkin, isLoading : isCheckingin} = useMutation({
        mutationFn :()=>updateBooking(bookingId, {
            status : "checked-in",
            isPaid : true
        }),
        onSuccess : (data) => {
        toast.success(`Booking # ${data.id} has been checked in`)
    
        queryClient.invalidateQueries({active : true})
        navigate("/")
    },
    onError : (error) => {
        toast.error("Could not check in booking")
    },
    });

    return {checkin, isCheckingin}
} 