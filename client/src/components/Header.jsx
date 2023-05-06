import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Layout, HeaderButton } from "./";
import { logout } from "../store/authSlice";
import { openLogin } from "../store/authSlice";
import { openSingIn } from "../store/registrationSlice";
import noteBnt from "../images/btns/note-btn.svg";
import login from "../images/btns/login.svg";
import arrow from "../images/btns/arrow_right.svg";
import logoutImg from "../images/btns/logout.svg";
import { all, done, notDone } from "../store/notesSlice";

export const Header = ({ openNote }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth } = useSelector((store) => store.auth);
  const className = isAuth ? "auth" : "not-auth";
  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.clear();
    navigate("/");
  };

  const handleSelectorChange = (e) => {
    const value = e.target.value;
    switch (value) {
      case "all":
        dispatch(all())
        break;
      case "done":
        dispatch(done())
        break;
      case "not-done":
        dispatch(notDone());
        break;
      default:
        break;
    }
  };
  return (
    <header className={`header header--${className}`}>
      <Layout>
        <div className={`header--${className}-inner`}>
          <div className="btns-row--top">
            <Button className="btn btn--top-note" onClick={openNote}>
              <img src={noteBnt} alt="notebtn" className="btn-img-note" />
            </Button>
            {isAuth ? (
              <HeaderButton
                text="Log out"
                icon={logoutImg}
                className="logout"
                onClick={handleLogout}
              />
            ) : (
              <div className="login-btns-wrapper">
                <HeaderButton
                  text="Sing Up"
                  icon={arrow}
                  className="login"
                  onClick={() => dispatch(openSingIn())}
                />
                <HeaderButton
                  text="Sing in"
                  icon={login}
                  className="login"
                  onClick={() => dispatch(openLogin())}
                />
              </div>
            )}
          </div>
          {isAuth ? (
            <div className="form-wrapper">
              <select
                className="note-select"
                name="select"
                onChange={handleSelectorChange}
              >
                <option value="all">All</option>
                <option value="done">Done</option>
                <option value="not-done">Not done</option>
              </select>
            </div>
          ) : (
            <>
              <h1 className="header-title">Organize work and life</h1>
              <p className="header-text">
                Todo list is the world's number one to-do list and task manager.
                It will help you gain concentration, organization and peace.
              </p>
            </>
          )}
        </div>
      </Layout>
    </header>
  );
};
