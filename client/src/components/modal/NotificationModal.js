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
          contentLabel="Notification Modal"
        >
          <div className="notification-modal">
            <h1 className="notification-title">
              To start work please autorize!
            </h1>
            <div className="notification-bnt-wrapper">
              <button onClick={onClose} className="btn btn-apply end">
                Ok
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
}