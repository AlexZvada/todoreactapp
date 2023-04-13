import { Button } from "./Button";
import { Layout } from "./Layout";
import noteBnt from "../images/btns/note-btn.svg";
import login from "../images/btns/login.svg";
import arrow from "../images/btns/arrow_right.svg";
import logout from "../images/btns/logout.svg";

import { useContext } from "react";
import { ModalContext } from "../App";
import { LoginModalWindow, SingInModalWindow } from "./ModalWindow";

export const NotAuthHeader = () => {
  const { setLoginIsOpen } = useContext(ModalContext);
  const { setSingInIsOpen } = useContext(ModalContext);
  function openLoginModal() {
    setLoginIsOpen(true);
  }

  function openSingInModal() {
    setSingInIsOpen(true);
  }
  return (
    <header className="header header--not-auth">
      <Layout>
        <div className="header--not-auth-inner">
          <div className="btns-row--top">
            <Button className="btn btn--top-note">
              <img src={noteBnt} alt="" className="btn-img-note" />
            </Button>
            <div className="login-btns-wrapper">
              <>
                <Button className="btn btn--login" onClick={openLoginModal}>
                  <span className="login-btns-inner">
                    <span className="login-btns-text">Sing up</span>
                    <img src={arrow} alt="" className="btn-img-arrow" />
                  </span>
                </Button>
                <LoginModalWindow />
              </>
              <>
                <Button className="btn btn--login" onClick={openSingInModal}>
                  <span className="login-btns-inner">
                    <span className="login-btns-text">Sing in</span>
                    <img src={login} alt="" className="btn-img-login" />
                  </span>
                </Button>
                <SingInModalWindow />
              </>
            </div>
          </div>
          <h1 className="header-title">Organize work and life</h1>
          <p className="header-text">
            Todo list is the world's number one to-do list and task manager. It
            will help you gain concentration, organization and peace.
          </p>
        </div>
      </Layout>
    </header>
  );
};

export const AuthHeader = () => {
  return (
    <header className="header header--auth">
      <Layout>
        <div className="header--auth-inner">
          <div className="btns-row--top">
            <Button className="btn btn--top-note">
              <img src={noteBnt} alt="" className="btn-img-note" />
            </Button>
            <Button className="btn btn--logout">
              <span className="login-btns-inner">
                <span className="login-btns-text">Log out</span>
                <img src={logout} alt="" />
              </span>
            </Button>
          </div>
          <div class="form-wrapper">
            <select class="note-select" name="select">
              <option value="all">All</option>
              <option value="done">Done</option>
              <option value="not-done">Not done</option>
            </select>
          </div>
        </div>
      </Layout>
    </header>
  );
};
