import Modal from "react-modal";
import { customStyles } from "./CustomStyles";
import close from "../../images/btns/close.svg";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import {fetchEditNote} from '../../store/notesSlice';
import { setValue} from '../../store/editNoteModalSlice'

Modal.setAppElement("#root");

export const EditNoteModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { id, data } = useSelector((store) => store.editModal);
  const onInputChange = (e) => {
    const { name, value } = e.target;
   dispatch(setValue({
    name,
    value
   }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const {title, text} = Object.fromEntries(formData.entries());
    const data = {
      title,
      text,
      id
    };
    dispatch(fetchEditNote(data));
    clearInput()
    onClose()
  };
  const clearInput = () => {
    // setInput({ title: "", text: "" });
  };

  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Edit Note Modal"
      >
        <div className="modal-edit-note">
          <h1 className="form-title">Edit Note</h1>
          <span className="form-edit-close" onClick={onClose}>
            <img src={close} alt="cancel"></img>
          </span>
          <form onSubmit={onSubmit}>
            <input
              name="title"
              onChange={onInputChange}
              value={data.title}
              placeholder="enter note title"
              required
            />
            <textarea
              name="text"
              onChange={onInputChange}
              value={data.text}
              placeholder="enter note text"
              required
            />
            <div className="modal-btns-wrapper">
              <Button onClick={onClose} className="btn btn-reject">cansel</Button>
              <Button type="submit" className="btn btn-apply">
                Edit
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
