import './App.scss';
import { Route, Routes } from "react-router-dom";
import { Index } from './pages/Index'
import { Notes } from './pages/notepage';
import { NotFound } from './pages/notfound';
import { Button } from './components/Button';
import { NotAuthHeader, AuthHeader } from './components/Header';
import { Layout } from "./components/Layout";
import noteBnt from "./images/btns/note-btn.svg";
import { createContext, useState } from "react";

export const ModalContext = createContext(null);

function App() {
  const isAuth=false;
  const [loginModalIsOpen, setLoginIsOpen] = useState(false)
  const [singInmodalIsOpen, setSingInIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false)
  const value = {
    loginModalIsOpen,
    setLoginIsOpen,
    singInmodalIsOpen,
    setSingInIsOpen,
    editIsOpen,
    setEditIsOpen
  };
  return (
    <ModalContext.Provider value={value}>
      <div className="App">
        {isAuth ? <AuthHeader /> : <NotAuthHeader />}
        <div className="main">
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </div>

        <footer className="footer">
          <Layout>
            <div className="footer-inner">
              <Button className="btn btn--top-note">
                <img src={noteBnt} alt="note" className="btn-img-note" />
              </Button>
              <span>Ⓒ 2023 To-do List</span>
            </div>
          </Layout>
        </footer>
      </div>
    </ModalContext.Provider>
  );
}

export default App;
