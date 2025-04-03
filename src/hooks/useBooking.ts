import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooknig(){
    const {bookingId} = useParams();
    const{isLoading, data:booking, error} = useQuery({queryKey:["booking" , bookingId], queryFn: () => getBooking(Number(bookingId))} );
    return {isLoading, booking, error};
}