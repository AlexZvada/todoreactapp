import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  inputError: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
};

const singInFormSlice = createSlice({
  name: "singInForm",
  initialState,
  reducers: {
    addInput: (state, action) => {
      state.input[action.payload.name] = action.payload.value;
    },
    clearInput: (state) => {
      state.input.username = "";
      state.input.password = "";
      state.input.confirmPassword = "";
      state.input.email = "";
    },
    addError: (state, action) => {
      state.inputError[action.payload.name] = action.payload.value;
    },
    clearError: (state) => {
      state.inputError.username = "";
      state.inputError.password = "";
      state.inputError.confirmPassword = "";
      state.inputError.email = "";

    },
  },
});

export const { addInput, clearInput, addError, clearError } =
  singInFormSlice.actions;

export default singInFormSlice.reducer;
