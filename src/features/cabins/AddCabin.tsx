import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button
        $variation="primary"
        onClick={() => setIsOpenModal((prev) => !prev)}
      >
        Add new Cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal((prev) => !prev)}>
          <CreateCabinForm
            onCloseModal={() => setIsOpenModal((prev) => !prev)}
          />
        </Modal>
      )}
    </div>
  );
}
