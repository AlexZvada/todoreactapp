import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Button } from "./Button";
import { clearAuthError, fetchLogin } from "../store/authSlice";
import { addInput, addError, clearLoginInput } from "../store/loginInputSlice";

export const LoginForm = ({
  close,
  onClose,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {isAuth, authError} = useSelector((store)=> store.auth)
  const { input, inputError } = useSelector((store) => store.loginInput);
  const loginRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    dispatch(fetchLogin({ login: data.username, password: data.password }));
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      addInput({
        name,
        value,
      })
    );
    validateInput(e);
  };
  const validateInput = (e) => {
    const { name, value } = e.target;
    dispatch(
      addError({
        name,
        value: "",
      })
    );
    dispatch(clearAuthError())
    switch (name) {
      case "username":
        if (!value) {
          dispatch(
            addError({
              name,
              value: "Enter User name",
            })
          );
        }
        break;

      case "password":
        if (!value) {
          dispatch(
            addError({
              name,
              value: "Enter password",
            })
          );
        } 
        break;

      default:
        break;
    }
  };

  useEffect(()=>{
    if (isAuth) {
      navigate("/notes");
    }
    dispatch(clearLoginInput());
  }, [isAuth, navigate, dispatch])
  return (
    <div className="modal-lofin">
      <form onSubmit={loginRequest} className="form-login">
        <h1 className="form-title">Log in </h1>
        <span className="form-login-close" onClick={onClose}>
          <img src={close} alt="cancel"></img>
        </span>
        <div className="input-wrapper">
          <label>
            <p className="modal-text">Name:</p>
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={onInputChange}
              onBlur={validateInput}
              required
            />
          </label>
          {inputError.username && (
            <span className="err">{inputError.username}</span>
          )}
          {authError.username && (
            <span className="err">{authError.username}</span>
          )}
        </div>
        <div className="input-wrapper">
          <label>
            <p className="modal-text">Password:</p>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
              required
            />
          </label>
          {inputError.password && (
            <span className="err">{inputError.password}</span>
          )}
          {authError.password && (
            <span className="err">{authError.password}</span>
          )}
        </div>
        <Button className="btn form-btn">Log in</Button>
      </form>
    </div>
  );
};
