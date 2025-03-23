import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";

interface Booking {
  id: number;
  created_at: string;
  startDate: string | null;
  endDate: string | null;
  numberNights: number | null;
  numberGuests: number | null;
  status: string | null;
  totalPrice: number | null;
  cabins: {
    name: string | null;
  } | null;
  guests: {
    fullName: string | null;
    email: string | null;
  } | null;
}

function BookingTable() {
  const {
    isPending,
    data: bookings,
    // error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
  console.log(bookings);
  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
