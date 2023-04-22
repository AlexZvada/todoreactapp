import Modal from 'react-modal';
import { customStyles } from './CustomStyles';

Modal.setAppElement('#root');

export const NotificationModal = ({open, onClose}) => {
    return (
      <>
        <Modal
          isOpen={open}
          onRequestClose={onClose}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h1>To start work please autorize!</h1>
          <button onClick={onClose}>Ok</button>
        </Modal>
      </>
    );
}