import Modal from "react-modal";
import { customStyles } from "./CustomStyles";
import close from "../../images/btns/close.svg";
import { SingInForm } from "../SingInForm";

Modal.setAppElement("#root");

export const SingInModal = ({ open, onClose }) => {
 
  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Sing In Modal"
      >
        <SingInForm
          onClose={onClose}
          close={close}
        />
      </Modal>
    </>
  );
};
