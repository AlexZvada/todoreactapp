import {createSlice} from '@reduxjs/toolkit'

export const notesSlice = createSlice({
    name: 'notes',
    initialState:{notes:[]},
    reducers:{
        add: (state, action) => {
            state.notes.push(action.payload)
        },
        remove: (state, action) => {
            state.notes.filter((note) => note.id !== action.id)
        },
        edit: (state, action) => {
            state.notes.map((note) => {
                if(note.id === action.id)
                note.text = action.text
                return note
            })
        }
    }
})