import { Modal } from "../../ui/Modal";

import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button $variation="primary">Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// export default function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button
//         $variation="primary"
//         onClick={() => setIsOpenModal((prev) => !prev)}
//       >
//         Add new Cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal((prev) => !prev)}>
//           <CreateCabinForm
//             onCloseModal={() => setIsOpenModal((prev) => !prev)}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// }
