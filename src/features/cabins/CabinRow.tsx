import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { deleteCabin } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CreateCabinForm from "./CreateCabinForm";
import { useMutationHandler } from "../../hooks/useMutateCabin";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { Modal } from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 3.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  min-width: 3rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({
  cabin,
}: {
  cabin: {
    created_at: string;
    description: string | null;
    discount: number | null;
    id: number;
    image: string | null;
    maxCapacity: number | null;
    name: string | null;
    regularPrice: number | null;
  };
}) {
  const { image, name, maxCapacity, regularPrice, discount, id } = cabin;

  const { mutate, isPending } = useMutationHandler(
    deleteCabin,
    "cabin deleted successfully",
    "An error occurred while deleting cabins",
    "cabin"
  );

  if (isPending) return <Spinner />;

  return (
    <>
      <TableRow role="row">
        <Img src={image as string} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice as number)}</Price>
        <Discount>{formatCurrency(discount as number)}</Discount>
        <div
          style={{
            display: "flex",
            gap: "0.6rem",
          }}
        >
          <Modal>
            <Modal.Open opens="edit">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>
          <Modal>
            <Modal.Open opens="delete">
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isPending}
                onConfirm={() => mutate(id)}
                onCloseModal={() => {}}
              />
            </Modal.Window>
          </Modal>
        </div>
      </TableRow>
    </>
  );
}
