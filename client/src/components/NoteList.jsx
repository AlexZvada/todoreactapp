import { Button } from "./Button";

import edit from "../images/btns/edit_btn.svg";
import remove from "../images/btns/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { openEditNote, setInitialValue } from "../store/editNoteModalSlice";
import { fetchDeleteNote, fetchStatus } from "../store/notesSlice";
import { useEffect } from "react";

export const NoteList = (list) => {
  const dispatch = useDispatch();
  const { notes, isNotes } = useSelector((store) => store.notes);
  const handleOpenEditNote = (e) => {
    const note = e.target.closest("div");
    const title = note.childNodes[0].innerText;
    const text = note.childNodes[1].innerText;

    dispatch(setInitialValue({ title, text }));
    dispatch(openEditNote(note.id));
  };
  const handleRemoveNote = (e) => {
    const note = e.target.closest("div");
    dispatch(fetchDeleteNote(note.id));
  };
  const handleToogle = (e) => {
    const note = e.target.closest("div");
    dispatch(fetchStatus(note.id));
  };
  return (
    <div>
      {isNotes ? (
        notes.map(({ id, title, text, status }) => {
          return (
            <div key={id} id={id} className="note">
              <p className="note-title">{title}</p>
              <p className="note-text">{text}</p>
              <span
                className={`note-status ${status ? "done" : ""}`}
                onClick={handleToogle}
              >
                {status ? "done" : "not done"}
              </span>
              <Button onClick={handleOpenEditNote} className="btn btn-edit">
                <img src={edit} alt="" className="btn-img-edit" />
              </Button>
              <Button onClick={handleRemoveNote} className="btn btn-remove">
                <img src={remove} alt="" className="btn-img-remove" />
              </Button>
            </div>
          );
        })
      ) : (
        <>
          <h1 className="empty-list--title">You don't have any tasks yet</h1>
          <p className="empty-list--parg">
            But you can always fix it. It's never too late to start making a
            list of plans
          </p>
        </>
      )}
    </div>
  );
};
// list.map(({ id, title, text, status }) => (
//     <div key={id} id={id} className="note">
//       <p className="note-title">{title}</p>
//       <p className="note-text">{text}</p>
//       <span className="note-status">{status ? "done" : "not done"}</span>
//       <Button onClick={handleOpenEditNote} className="btn btn-edit">
//         <img src={edit} alt="" className="btn-img-edit" />
//       </Button>
//       <Button onClick={handleRemoveNote} className="btn btn-remove">
//         <img src={remove} alt="" className="btn-img-remove" />
//       </Button>
//     </div>
