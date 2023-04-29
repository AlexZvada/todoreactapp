import Modal from "react-modal";
import { customStyles } from "./CustomStyles";
import close from "../../images/btns/close.svg";
import { useState } from "react";
import { Button } from "../Button";
import { useDispatch } from "react-redux";
import {fetchAddNote} from '../../store/notesSlice'

Modal.setAppElement("#root");

export const AddNoteModal = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    text: "",
    title: "",
  });
  const [serverError, setServerErr] = useState({
    server: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev)=>({
      ...prev,
      [name]: value
    }));
    setServerErr({ server: "" });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    dispatch(fetchAddNote(data));
    clearInput()
    onClose()
  };
  const clearInput = () => {
    setInput({ title: "", text: "" });
  };

  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Add Note Modal"
      >
        <div className="modal-add-note">
          <form onSubmit={onSubmit}>
            <h1 className="form-title">Add new task</h1>
            <span className="form-add-note-close" onClick={onClose}>
              <img src={close} alt="cancel"></img>
            </span>
            <input
              name="title"
              onChange={onInputChange}
              value={input.title}
              placeholder="Enter note title"
              required
            />
            <textarea
              name="text"
              onChange={onInputChange}
              value={input.note}
              placeholder="Enter note text"
              required
            />
            {serverError.server && (
              <span className="err">{serverError.server}</span>
            )}
            <div className="modal-btns-wrapper">
              <Button onClick={onClose} className="btn btn-reject">
                cansel
              </Button>
              <Button type="submit" className="btn btn-apply">
                add
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
