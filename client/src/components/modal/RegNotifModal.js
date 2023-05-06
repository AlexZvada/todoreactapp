import Modal from "react-modal";
import { useSelector } from "react-redux";
import { customStyles } from "./CustomStyles";

Modal.setAppElement("#root");

export const RegistrationNotificModal = (onClose, open)=> {
      const {message} = useSelector((store) => store.reg);

    return (
      <Modal
        isOpen={open}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Sing In Modal"
      >
        <div>
          {message}{" "}
          <button onClick={onClose} className="btn">
            oK
          </button>
        </div>
      </Modal>
    );
}