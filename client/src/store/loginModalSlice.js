import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

export const loginModalSlice = createSlice({
    name:'loginModal',
    initialState,
    reducers:{
        openLogin:(store)=>{
            store.isOpen = true
        },
        closeLogin:(store)=>{
            store.isOpen = false
        }
    }
})

export const {openLogin, closeLogin} = loginModalSlice.actions;

export default loginModalSlice.reducer;