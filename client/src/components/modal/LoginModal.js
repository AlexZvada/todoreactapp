import Modal from 'react-modal';
import { customStyles } from './CustomStyles';
import  close  from "../../images/btns/close.svg";
import { LoginForm } from './LoginForm';
import { useState } from 'react';

Modal.setAppElement('#root')

export const LoginModal = ({open, onClose}) => {
  const [input, setInput] = useState({
    name: '',
    password: ''
  })
  const [serverError, setServerErr] = useState({ name:'', password:'', server:'' });

  const onInputChange = (e)=>{
    const {name, value} = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
    setServerErr({ name: "", password: "", server:"" });
  }

  const clearInput = () => {
    setInput({name:'', password:""})
  }

  
    return (
      <>
        <Modal
          isOpen={open}
          onRequestClose={onClose}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-login">
            <LoginForm
              close={close}
              onClose={onClose}
              value={input}
              onInputChange={onInputChange}
              error={serverError}
              setError={setServerErr}
              clear={clearInput}
            />
          </div>
        </Modal>
      </>
    );
}





