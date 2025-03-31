import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

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

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    // id: bookingId,
    // created_at,
    startDate,
    endDate,
    numberNights,
    // numberGuests,
    totalPrice,
    status,
    guests,
    cabins,
  },
}: {
  booking: Booking;
}) {
  const guestName = guests ? guests.fullName : null;
  const email = guests ? guests.email : null;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const cabinName = cabins ? cabins.name : null;

  const handleStatus = (status: string): string => {
    const st = status as keyof typeof statusToTagName;
    return statusToTagName[st];
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {startDate && isToday(new Date(startDate))
            ? "Today"
            : startDate && formatDistanceFromNow(startDate)}{" "}
          &rarr; {numberNights} night stay
        </span>
        <span>
          {startDate && format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {endDate && format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={handleStatus(status as string)}>
        {(status as string).replace("-", " ")}
      </Tag>

      <Amount>{formatCurrency(totalPrice as number)}</Amount>
    </Table.Row>
  );
}

export default BookingRow;
