import Modal from "react-modal";
import { Oval } from "react-loader-spinner";
import { customStyles } from "./CustomStyles";

Modal.setAppElement("#root");


export const SpinerModal = ({open, onClose}) =>{
    return (
      <>
        <Modal
          isOpen={open}
          onRequestClose={onClose}
          style={customStyles}
          contentLabel="Spiner Modal"
        >
          <Oval
            height={80}
            width={80}
            color="#516769"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#516769"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </Modal>
      </>
    );
};