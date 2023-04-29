import {configureStore} from '@reduxjs/toolkit';
import authReduser from './authSlice';
import singInReducer from './singInModalSlice';
import noteModalReduser from './noteModalSlice';
import notificationModalReducer from './notificationModalSlice';
import registrationReduser from './registrationSlice';
import singInFormReduser from './singInFormInputSlice';
import loginInputReducer from './loginInputSlice';
import noteReducer from './notesSlice';
import editReduser from './editNoteModalSlice'


export const store = configureStore({
  reducer: {
    auth: authReduser,
    singIn: singInReducer,
    noteModal: noteModalReduser,
    editModal: editReduser,
    notificationModal: notificationModalReducer,
    reg: registrationReduser,
    singInInput: singInFormReduser,
    loginInput: loginInputReducer,
    notes:noteReducer,
  },
});