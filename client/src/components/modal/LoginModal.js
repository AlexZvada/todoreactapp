import Modal from 'react-modal';
import { customStyles } from './CustomStyles';
import  close  from "../../images/btns/close.svg";
import { LoginForm } from '../LoginForm';

Modal.setAppElement('#root')

export const LoginModal = ({open, onClose}) => {
     return (
      <>
        <Modal
          isOpen={open}
          onRequestClose={onClose}
          style={customStyles}
          contentLabel="Login Modal"
        >
          <div className="modal-login">
            <LoginForm
              close={close}
              onClose={onClose}
            />
          </div>
        </Modal>
      </>
    );
}





