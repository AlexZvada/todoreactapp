import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  id: null,
  data: {
    title: "",
    text: "",
  },
};

const editNoteModalSlice = createSlice({
  name: "editNote",
  initialState,
  reducers: {
    openEditNote: (state, action) => {
      state.isOpen = true;
      state.id = action.payload;
    },
    closeEditNote: (state) => {
      state.isOpen = false;
    },
    setInitialValue: (state, action) => {
      state.data.title = action.payload.title;
      state.data.text = action.payload.text;
    },
    setValue: (state, action) => {
      state.data[action.payload.name] = action.payload.value;
    },
  },
});

export const { openEditNote, closeEditNote, setInitialValue, setValue } =
  editNoteModalSlice.actions;

export default editNoteModalSlice.reducer;
