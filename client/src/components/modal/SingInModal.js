import Modal from "react-modal";
import { customStyles } from "./CustomStyles";
import close from "../../images/btns/close.svg";
import { useState } from "react";
import { SingInForm } from "./SingInForm";

Modal.setAppElement("#root");

export const SingInModal = ({ open, onClose }) => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [serverError, setServerErr] = useState({ message: "" });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
    validateInput(e);
    serverErrors(e)
  };

  const serverErrors = (e) => {
    const { name } = e.target;

    if (name === "username") {
      setServerErr({message:''})
    }
  }

  const validateInput = (e) => {
    const { name, value } = e.target;

    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "Enter User name";
          }
          break;

        case "email":
          if (!value) {
            stateObj[name] = "Enter email";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Enter Confirm password";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "password and confirm password does not match";
          }
          break;
        default:
          break;
      }
      return stateObj;
    });
  };

  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <SingInForm
          onClose={onClose}
          close={close}
          input={input}
          onInputChange={onInputChange}
          validateInput={validateInput}
          error={error}
          serverErr={serverError}
          setServerErr = {setServerErr}
        />
      </Modal>
    </>
  );
};
