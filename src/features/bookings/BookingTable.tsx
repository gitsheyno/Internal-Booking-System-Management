import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 5;
function BookingTable() {
  const queryClient = useQueryClient();
  const [searchparams] = useSearchParams();

  // Filter

  const filterValue = searchparams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // Sort

  const sortBy = searchparams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const sort = { field, direction };

  // Pagination
  const page: number = Number(searchparams.get("page")) || 1;

  const {
    isPending,
    data,
    // error,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings({ filter, sort, page }),
  });

  if (isPending) return <Spinner />;

  const bookings = data?.data;
  const count = data?.count;

  const pageCount = Math.ceil((count as number) / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
    });
  }
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
        <Table.Footer>
          <Pagination count={count as number} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
