import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isAuth: false,
  authError: {
    username: "",
    password: "",
  },
};
export const fetchVerify = createAsyncThunk("verify/fetchVerify", async () => {
  const res = await fetch("https://my-notes-app-9ho3.onrender.com/verify", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("user")}`,
    },
  });
  if (res.ok) {
    return "verify";
  } else {
    return Promise.reject("not verify");
  }
});

export const fetchLogin = createAsyncThunk("login/fetchLogin", async (data) => {
  const res = await fetch("https://my-notes-app-9ho3.onrender.com/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const message = await res.json();
    return message;
  } else {
    const err = await res.json();
    return Promise.reject(err);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      sessionStorage.clear();
    },
    openLogin: (store) => {
      store.isOpen = true;
    },
    closeLogin: (store) => {
      store.isOpen = false;
    },
    clearAuthError: (store) => {
      store.authError.username = "";
      store.authError.password = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.isAuth = true;
      state.isOpen = false;
      sessionStorage.setItem("user", action.payload);
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.isAuth = false;
      state.isOpen = true;
      if (action.error.message === "User does not exist") {
        state.authError.username = action.error.message;
      } else {
        state.authError.password = action.error.message;
      }
    });
    builder.addCase(fetchVerify.fulfilled, (state) => {
      state.isAuth = true;
    });
    builder.addCase(fetchVerify.rejected, (state) => {
      state.isAuth = false;
    });
  },
});

export const { login, logout, openLogin, closeLogin, clearAuthError } =
  authSlice.actions;

export default authSlice.reducer;
