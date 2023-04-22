import {configureStore} from '@reduxjs/toolkit';
import authReduser from './authSlice';
import loginReduser from './loginModalSlice';
import singInReducer from './singInModalSlice';
import noteModalReduser from './noteModalSlice';
import notificationModalReducer from './notificationModalSlice';
import registrationReduser from './registrationSlice';
export const store = configureStore({
  reducer: {
    auth: authReduser,
    login: loginReduser,
    singIn: singInReducer,
    noteModal: noteModalReduser,
    notificationModal: notificationModalReducer,
    reg: registrationReduser
  },
});