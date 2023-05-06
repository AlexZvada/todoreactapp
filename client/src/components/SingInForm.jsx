import { useDispatch, useSelector } from "react-redux";
import { fetchRegistration } from "../store/registrationSlice";
import {
  addInput,
  addError,
} from "../store/singInFormInputSlice";
import { Button } from "./Button";

export const SingInForm = ({ onClose, close }) => {
  const dispatch = useDispatch();
  const { error} = useSelector((store) => store.reg);
  const { input, inputError } = useSelector((store) => store.singInInput);
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

      case "email":
        if (!value) {
          dispatch(
            addError({
              name,
              value: "Enter email",
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
        } else if (input.confirmPassword && value !== input.confirmPassword) {
          dispatch(
            addError({
              name: "confirmPassword",
              value: "Password and Confirm Password does not match.",
            })
          );
        } else {
        }
        break;

      case "confirmPassword":
        if (!value) {
          dispatch(
            addError({
              name,
              value: "Enter Confirm password",
            })
          );
        } else if (input.password && value !== input.password) {
          dispatch(
            addError({
              name,
              value: "password and confirm password does not match",
            })
          );
        }
        break;
      default:
        break;
    }
  };
  const singInRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (
      !inputError.username &&
      !inputError.email &&
      !inputError.password &&
      !inputError.confirmPassword
    ) {
      dispatch(
        fetchRegistration({
          login: data.username,
          password: data.password,
          email: data.email,
        })
      );
    }
  };
  return (
    <div className="modal-registration">
        <form onSubmit={singInRequest} className="form-registration">
          <h1 className="form-title">Registration</h1>
          <span className="form-registration-close" onClick={onClose}>
            <img src={close} alt="cancel"></img>
          </span>
          <div className="input-wrapper">
            <label>
              <p className="modal-text">Name:</p>
              <input
                type="text"
                name="username"
                required
                value={input.username}
                onChange={onInputChange}
                onBlur={validateInput}
              />
              {inputError.username && (
                <span className="err">{inputError.username}</span>
              )}
              {error.message && <span>{error.message}</span>}
            </label>
          </div>

          <div className="input-wrapper">
            <label>
              <p className="modal-text">Email:</p>
              <input
                type="email"
                required
                name="email"
                value={input.email}
                onChange={onInputChange}
                onBlur={validateInput}
              />
            </label>
            {inputError.email && (
              <span className="err">{inputError.email}</span>
            )}
          </div>
          <div className="input-wrapper">
            <label>
              <p className="login-label-text">Password:</p>
              <input
                required
                type="password"
                name="password"
                value={input.password}
                onChange={onInputChange}
                onBlur={validateInput}
              />
              {inputError.password && (
                <span className="err">{inputError.password}</span>
              )}
            </label>
          </div>
          <div className="input-wrapper">
            <label>
              <p className="login-label-text">Confirm password:</p>
              <input
                required
                type="password"
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={onInputChange}
                onBlur={validateInput}
              />
              {inputError.confirmPassword && (
                <span className="err">{inputError.confirmPassword}</span>
              )}
            </label>
          </div>
          <Button className="btn form-btn">Registration</Button>
        </form>
    </div>
  );
};
