import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isOpen: false
}

const noteModalSlise = createSlice({
  name: "noteModal",
  initialState,
  reducers: {
    openNoteModal: (state) => {
      state.isOpen = true;
    },
    closeNoteModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const {openNoteModal, closeNoteModal } = noteModalSlise.actions;

export default noteModalSlise.reducer