import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

const notificationModalSlice = createSlice({
    name: 'notificationModal',
    initialState,
    reducers:{
        openNotification:(store)=> {
            store.isOpen = true
        },
        closeNotification: (store)=> {
            store.isOpen = false
        }
    }
})

export const {openNotification, closeNotification } = notificationModalSlice.actions;

export default notificationModalSlice.reducer