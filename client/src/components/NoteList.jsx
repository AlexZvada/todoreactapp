import {Button} from './Button';
import edit from '../images/btns/edit_btn.svg';
import remove from '../images/btns/delete.svg'

export const FilledNoteList = (list) => {
    return list.map(({ id, title, text, status }) => (
      <div key={id} className="note">
        <p className="note-title">{title}</p>
        <p className="note-text">{text}</p>
        <span className="note-status">{status?'done':'not done'}</span>
        <Button onClick={() => {}} className="btn btn-edit">
          <img src={edit} alt="" className="btn-img-edit" />
        </Button>
        <Button onClick={() => {}} className="btn btn-remove">
          <img src={remove} alt="" className="btn-img-remove" />
        </Button>
      </div>
    ));
};

export const EmptyNoteList = () => {
  return (
    <>
      <h1 className="empty-list--title">You don't have any tasks yet</h1>
      <p className="empty-list--parg">
        But you can always fix it. It's never too late to start making a list of
        plans
      </p>
    </>
  );
};