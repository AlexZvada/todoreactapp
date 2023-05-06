import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  status: false,
  isLoading: false,
  message: "",
  error: {
      message: null
  }
};

export const fetchRegistration = createAsyncThunk(
  "registration/fetchRegistration",
  async (data) => {
    const res = await fetch(
      "https://my-notes-app-9n4h.onrender.com/registration",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (res.ok) {
      const message = await res.json();
      return message;
    } else {
      const err = await res.json();
      return Promise.reject(err);
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    openSingIn: (store) => {
      store.isOpen = true;
    },
    closeSingIn: (store) => {
      store.isOpen = false;
    },
    clean: (state) => {
      state.status = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.isOpen = false;
      state.status = true;
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(fetchRegistration.pending, (state) => {
      state.isLoading = true;
      state.isOpen = true;
      state.status = false
    });
    builder.addCase(fetchRegistration.rejected, (state, action) => {
      state.status = false;
      state.isLoading = false;
      state.isOpen = true;
      state.error.message = action.error.message;
    });
  },
});

export const {clean, closeSingIn, openSingIn} = registrationSlice.actions
export default registrationSlice.reducer;

