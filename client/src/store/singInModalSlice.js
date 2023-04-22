import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const singInModalSlice = createSlice({
  name: "singInModal",
  initialState,
  reducers: {
    openSingIn: (store) => {
      store.isOpen = true;
    },
    closeSingIn: (store) => {
      store.isOpen = false;
    },
  },
});

export const { openSingIn, closeSingIn } = singInModalSlice.actions;

export default singInModalSlice.reducer;
