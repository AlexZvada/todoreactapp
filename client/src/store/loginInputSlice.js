import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    input:{
        username:'',
        password:''
    },
    inputError:{
        username:'',
        password:''
    }
}

const loginInputSlice = createSlice({
  name: "loginInput",
  initialState,
  reducers: {
    addInput: (state, action) => {
      state.input[action.payload.name] = action.payload.value;
    },
    clearLoginInput: (state) => {
      state.input.username = "";
      state.input.password = "";
    },
    addError: (state, action) => {
      state.inputError[action.payload.name] = action.payload.value;
    },
    clearLoginError: (state) => {
      state.inputError.username = "";
      state.inputError.password = "";
    },
  },
});

export const { addInput, clearLoginInput, addError, clearLoginError } =
  loginInputSlice.actions;

export default loginInputSlice.reducer