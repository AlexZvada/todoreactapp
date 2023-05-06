import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { IndexPage, NotFound, NotePage } from "./pages";
import { Button, Layout, Header } from "./components";
import {
  LoginModal,
  SingInModal,
  AddNoteModal,
  EditNoteModal,
  NotificationModal,
  SpinerModal,
  RegistrationNotificModal

} from "./components";
import noteBnt from "./images/btns/note-btn.svg";
import { useDispatch, useSelector } from "react-redux";
import { closeLogin, fetchVerify } from "./store/authSlice";
import { clearLoginInput, clearLoginError } from "./store/loginInputSlice";
import { closeSingIn } from "./store/registrationSlice";
import { clean } from "./store/registrationSlice";
import { clearInput, clearError } from "./store/singInFormInputSlice";
import { openNoteModal, closeNoteModal } from "./store/noteModalSlice";
import {
  openNotification,
  closeNotification,
} from "./store/notificationModalSlice";
import { closeEditNote } from "./store/editNoteModalSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((store) => store.auth);
  const fetchState = useSelector((store) => store.notes);
  const noteModalState = useSelector((store) => store.noteModal);
  const notificationState = useSelector((store) => store.notificationModal);
  const editModalState = useSelector((store) => store.editModal);
  const registrationState = useSelector((store)=>store.reg)
  const handelOpenNoteModal = () => {
    if (loginState.isAuth) {
      dispatch(openNoteModal());
    } else {
      dispatch(openNotification());
    }
  };
  const handleCloseEditModal = () => {
    dispatch(closeEditNote());
  };

  const handleCloseLogin = () => {
    dispatch(closeLogin());
    dispatch(clearLoginInput());
    dispatch(clearLoginError());
  };
  const handleCloseSingIn = () => {
    dispatch(closeSingIn());
    dispatch(clearInput());
    dispatch(clearError());
  };
  const handleCloseNote = () => {
    dispatch(closeNoteModal());
  };

  useEffect(() => {
    dispatch(fetchVerify());
  }, [dispatch]);

  useEffect(() => {
    if (loginState.isAuth) {
      navigate("/notes");
    }
  }, [loginState, navigate]);
  return (
    <div className="App">
      <Header openNote={handelOpenNoteModal} />
      <div className="main">
        <Layout>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/notes" element={<NotePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </div>

      <footer className="footer">
        <Layout>
          <div className="footer-inner">
            <Button className="btn btn--top-note" onClick={handelOpenNoteModal}>
              <img src={noteBnt} alt="note" className="btn-img-note" />
            </Button>
            <span>Ⓒ 2023 To-do List</span>
          </div>
        </Layout>
      </footer>
      <LoginModal open={loginState.isOpen} onClose={handleCloseLogin} />
      <SingInModal
        open={registrationState.isOpen}
        onClose={handleCloseSingIn}
      />
      <AddNoteModal open={noteModalState.isOpen} onClose={handleCloseNote} />
      <NotificationModal
        open={notificationState.isOpen}
        onClose={() => dispatch(closeNotification())}
      />
      <EditNoteModal
        open={editModalState.isOpen}
        onClose={handleCloseEditModal}
      />
      <SpinerModal
        open={
          notificationState.isLoading ||
          editModalState.isLoading ||
          loginState.isLoading ||
          registrationState.isLoading ||
          noteModalState.isLoading ||
          fetchState.isLoading
        }
      />
      <RegistrationNotificModal
        open={registrationState.status}
        onClose={() => dispatch(clean())}
      />
    </div>
  );
}

export default App;
