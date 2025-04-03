import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import { useBooknig } from '../../hooks/useBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import Spinner from '../../ui/Spinner';
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from 'react-icons/hi2';
import { useCheckout } from '../cabins/useCheckout';
import { Modal } from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from './useDeleteBooking';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { deleteBookingMutation, isDeleting } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };
  const { checkOut, isCheckingOut } = useCheckout();
  const { booking, isLoading } = useBooknig();
  if (isLoading) {
    return <Spinner />;
  }
  const { id: bookingId, status } = booking;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        )}
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {status === 'checked-in' && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkOut(bookingId)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() => deleteBookingMutation(bookingId)}
              onCloseModal={() => {}}
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
