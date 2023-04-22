import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { IndexPage, NotFound, NotePage } from "./pages";
import { Button, Layout, Header } from "./components";
import {
  LoginModal,
  SingInModal,
  AddNoteModal,
  NotificationModal,
} from "./components";
import noteBnt from "./images/btns/note-btn.svg";
import { useDispatch, useSelector } from "react-redux";
import { closeLogin } from "./store/loginModalSlice";
import { closeSingIn } from "./store/singInModalSlice";
import { closeNoteModal, openNoteModal } from "./store/noteModalSlice";
import {
  openNotification,
  closeNotification,
} from "./store/notificationModalSlice";

function App() {
  const dispatch = useDispatch();
  const loginState = useSelector((store) => store.login);
  const singInState = useSelector((store) => store.singIn);
  const noteModalState = useSelector((store) => store.noteModal);
  const notificationState = useSelector((store) => store.notificationModal);
  const { isAuth } = useSelector((store) => store.auth);

  const handelOpenNoteModal = () => {
    if (isAuth) {
      dispatch(openNoteModal());
    } else {
      dispatch(openNotification());
    }
  };
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
      <LoginModal
        open={loginState.isOpen}
        onClose={() => dispatch(closeLogin())}
      />
      <SingInModal
        open={singInState.isOpen}
        onClose={() => dispatch(closeSingIn())}
      />
      <AddNoteModal
        open={noteModalState.isOpen}
        onClose={() => dispatch(closeNoteModal())}
      />
      <NotificationModal
        open={notificationState.isOpen}
        onClose={() => dispatch(closeNotification())}
      />
    </div>
  );
}

export default App;
