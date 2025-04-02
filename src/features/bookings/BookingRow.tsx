import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import Menus from '../../ui/Menus';
import Tag from '../../ui/Tag';
import Table from '../../ui/Table';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../cabins/useCheckout';
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
  font-family: 'Sono';
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
  font-family: 'Sono';
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
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

  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const cabinName = cabins ? cabins.name : null;

  const { checkOut, isCheckingOut } = useCheckout();

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
            ? 'Today'
            : startDate && formatDistanceFromNow(startDate)}{' '}
          &rarr; {numberNights} night stay
        </span>
        <span>
          {startDate && format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {endDate && format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={handleStatus(status as string)}>
        {(status as string).replace('-', ' ')}
      </Tag>

      <Amount>{formatCurrency(totalPrice as number)}</Amount>
      <Menus.Menu>
        <Menus.Toggle id={bookingId} />
        <Menus.List id={bookingId}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${bookingId}`)}
          >
            See Details
          </Menus.Button>
          {status === 'unconfirmed' && (
            <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              Check in
            </Menus.Button>
          )}
          {status === 'checked-in' && (
            <Menus.Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkOut(bookingId)}
              disabled={isCheckingOut}
            >
              Check out
            </Menus.Button>
          )}
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
