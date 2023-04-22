import { Button } from "../Button";
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";




const serverErrors = (message, handler) =>{
  handler(message)
}

export const LoginForm = ({
  close,
  onClose,
  onInputChange,
  value,
  error,
  setError,
  clear
}) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  const loginRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        login: data.name,
        password: data.password,
      }),
    });
    if (res.ok) {
      const token = await res.json();
      sessionStorage.setItem('token', token)
      navigate('/notes')
      dispatch(login())
      clear()
      onClose()
    } else {
      const message = await res.json();
      serverErrors(message, setError);
    }
  };
  return (
    <form onSubmit={loginRequest}>
      <h1>Log in </h1>
      <span className="form-cancel" onClick={onClose}>
        <img src={close} alt="cancel"></img>
      </span>
      <label>
        <p className="login-label-text">Name:</p>
        <input
          type="text"
          required
          name="name"
          onChange={onInputChange}
          value={value.name}
        />
      </label>
      {error.name && <span className="err">{error.name}</span>}
      <label>
        <p className="login-label-text">Password:</p>
        <input
          type="password"
          required
          name="password"
          onChange={onInputChange}
          value={value.password}
        />
      </label>
      {error.password && <span className="err">{error.password}</span>}
      {error.server&& <span className="err">{error.server}</span>}

      <div>
        <Button className="login-btn">
          Log in
        </Button>
      </div>
    </form>
  );
};
