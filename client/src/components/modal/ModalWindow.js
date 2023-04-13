import Modal from 'react-modal'
import { useContext } from 'react';
import { ModalContext } from '../App';

Modal.setAppElement('#root')


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export const LoginModalWindow = () => {
    const {loginModalIsOpen, setLoginIsOpen} = useContext(ModalContext);

    function closeModal() {
      setLoginIsOpen(false);
    }

    return (
      <>
        <Modal
          isOpen={loginModalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>I'm login modal window</h2>
          <button onClick={closeModal}>close</button>
        </Modal>
      </>
    );
}

export const SingInModalWindow = () => {
  const { singInmodalIsOpen, setSingInIsOpen } = useContext(ModalContext);

  function closeModal() {
    setSingInIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={singInmodalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>I'm sing in modal window</h2>
        <button onClick={closeModal}>close</button>
      </Modal>
    </>
  );
};



