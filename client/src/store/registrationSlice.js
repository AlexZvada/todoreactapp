import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  message: "",
  error: {
    username:null
  }
};

export const fetchRegistration = createAsyncThunk(
  "registration/fetchRegistration",
  async (data) => {
    const res = await fetch("http://localhost:8080/registration", {
      method: "POST",
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
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.status = true;
      state.message = action.payload;
    });
    builder.addCase(fetchRegistration.rejected, (state, action) => {
      state.error.username = action.error.message;
    });
  },
});

export default registrationSlice.reducer;
