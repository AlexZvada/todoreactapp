import Modal from "react-modal";
import { customStyles } from "./CustomStyles";
import close from "../../images/btns/close.svg";
import { useState } from "react";
import { Button } from "../Button";

Modal.setAppElement("#root");

export const AddNoteModal = ({ open, onClose }) => {
  const [input, setInput] = useState({
    note: "",
  });
  const [serverError, setServerErr] = useState({
    server: "",
  });

  const onInputChange = (e) => {
    const { value } = e.target;
    setInput(value)
    setServerErr({ server: "" });
  };

  const clearInput = () => {
    setInput({ note: "" });
  };


  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-login">
          <h1>Add new task</h1>
          <span className="form-cancel" onClick={onClose}>
            <img src={close} alt="cancel"></img>
          </span>
          <input onChange={onInputChange} value={input.note} />
          {serverError.server && (
            <span className="err">{serverError.server}</span>
          )}
          <Button onClick={clearInput}>add</Button>
          <Button onClick={onClose}>cansel</Button>
        </div>
      </Modal>
    </>
  );
};
