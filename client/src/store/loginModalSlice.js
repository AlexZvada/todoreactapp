// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     isOpen: false
// }

// export const loginModalSlice = createSlice({
//     name:'loginModal',
//     initialState,
//     reducers:{
//         openLogin:(store)=>{
//             store.isOpen = true
//         },
//         closeLogin:(store)=>{
//             store.isOpen = false
//         }
//     }
// })

// export const {openLogin, closeLogin} = loginModalSlice.actions;

// export default loginModalSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   status: false,
//   message: "",
//   error: {
//       message: null
//   }
// };

// export const fetchRegistration = createAsyncThunk(
//   "registration/fetchRegistration",
//   async (data) => {
//     const res = await fetch("http://localhost:8080/registration", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     if (res.ok) {
//       const message = await res.json();
//       return message;
//     } else {
//       const err = await res.json();
//       return Promise.reject(err);
//     }
//   }
// );

// const registrationSlice = createSlice({
//   name: "registration",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchRegistration.fulfilled, (state, action) => {
//       state.status = true;
//       state.message = action.payload;
//     });
//     builder.addCase(fetchRegistration.rejected, (state, action) => {
//       state.error.message = action.error.message;
//     });
//   },
// });

// export default registrationSlice.reducer;