import { useDispatch, useSelector } from "react-redux";
import { fetchRegistration } from '../../store/registrationSlice'
import { Button } from "../Button";


export const SingInForm = ({
  onClose,
  close,
  input,
  onInputChange,
  validateInput,
  // error,
  serverErr,
  setServerErr
}) => {
  const dispatch = useDispatch()
  const {error, message, status } = useSelector(store=> store.reg)
  const singInRequest = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // const res = await fetch("http://localhost:8080/registration", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json", 
    //   },
    //   body: JSON.stringify({
    //     login: data.username,
    //     password: data.password,
    //     email: data.email
    //   }),
    // });
    // if (res.ok) {
    //   onClose(false)
    // }else {
    //   const responce = await res.json()
    //   setServerErr({ message: responce.message });
    // }
    dispatch(
      fetchRegistration({
        login: data.username,
        password: data.password,
        email: data.email,
      })
    );
  };
  return (
    <div className="modal-login">
      {status ? (
        <div>{message} <button onClick={onClose}>oK</button></div>
      ) : (
        <form onSubmit={singInRequest}>
          <h1>Registration</h1>
          <span className="form-cancel" onClick={onClose}>
            <img src={close} alt="cancel"></img>
          </span>
          <label>
            <p className="login-text">Name:</p>
            <input
              type="text"
              name="username"
              required
              // value={input.username}
              // onChange={onInputChange}
              // onBlur={validateInput}
            />
            {error.username && <span className="err">{error.username}</span>}
          {/* {serverErr.message && <span>{serverErr.message}</span>} */}
          </label>

          <label>
            <p className="login-text">Email:</p>
            <input
              type="email"
              required
              name="email"
              // value={input.email}
              // onChange={onInputChange}
              // onBlur={validateInput}
            />
          </label>
          {/* {error.email && <span className="err">{error.email}</span>} */}
          <label>
            <p className="login-label-text">Password:</p>
            <input
              required
              type="password"
              name="password"
              // value={input.password}
              // onChange={onInputChange}
              // onBlur={validateInput}
            />
            {/* {error.password && <span className="err">{error.password}</span>} */}
          </label>

          <label>
            <p className="login-label-text">Confirm password:</p>
            <input
              required
              type="password"
              name="confirmPassword"
              // value={input.confirmPassword}
              // onChange={onInputChange}
              // onBlur={validateInput}
            />
            {/* {error.confirmPassword && (
            <span className="err">{error.confirmPassword}</span>
            )} */}
          </label>

          <div>
            <Button type="sybmit" className="login-btn">
              Log in
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};