import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNotes: false,
  notes: [],
  toShow: [],
  error: null,
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const res = await fetch("https://my-notes-app-9n4h.onrender.com/notes", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("user")}`,
    },
  });
  if (res.ok) {
    const notes = await res.json();
    if (notes[0]) {
      return notes;
    } else return Promise.reject("note list empty");
  } else {
    const err = await res.json();
    return Promise.reject(err);
  }
});

export const fetchAddNote = createAsyncThunk(
  "note/fetchAddNote",
  async (data) => {
    const res = await fetch("https://my-notes-app-9n4h.onrender.com/note", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("user")}`,
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const note = await res.json();
      return note;
    }
  }
);

export const fetchEditNote = createAsyncThunk(
  "note/fetchEditNote",
  async (data) => {
    const res = await fetch("https://my-notes-app-9n4h.onrender.com/note", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("user")}`,
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const note = await res.json();
      return note;
    }
  }
);

export const fetchStatus = createAsyncThunk(
  "status/fetchStatus",
  async (id) => {
    const res = await fetch(
      "https://my-notes-app-9n4h.onrender.com/note-status",
      {
        method: "PUt",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("user")}`,
        },
        body: JSON.stringify({ id }),
      }
    );
    if (res.ok) {
      const note = await res.json();
      return note;
    }
  }
);

export const fetchDeleteNote = createAsyncThunk(
  "note/fetchDeletetNote",
  async (id) => {
    const res = await fetch("https://my-notes-app-9n4h.onrender.com/note", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("user")}`,
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      return id;
    }
  }
);

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    all: (state) => {
      state.toShow = state.notes;
    },
    done: (state) => {
      state.toShow = state.notes.filter((note) => note.status);
    },
    notDone: (state) => {
      state.toShow = state.notes.filter((note) => !note.status);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      if (action.payload) {
        state.isNotes = true;
        state.notes = action.payload;
        state.toShow = state.notes;
      }
    });
    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.isNotes = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchAddNote.fulfilled, (state, action) => {
      state.isNotes = true;
      state.notes.push(action.payload);
      state.toShow = state.notes
    });
    builder.addCase(fetchEditNote.fulfilled, (state, action) => {
      const noteId = action.payload.id;
      const listId = state.notes.findIndex((note) => note.id === noteId);
      state.notes[listId] = action.payload;
      state.toShow = state.notes;
    });
    builder.addCase(fetchDeleteNote.fulfilled, (state, action) => {
      const noteId = Number(action.payload);
      state.notes = state.notes.filter((note) => note.id !== noteId);
      if (!state.notes[0]) {
        state.isNotes = false;
      }
      state.toShow = state.notes;
    });
    builder.addCase(fetchStatus.fulfilled, (state, action) => {
      const noteId = action.payload.id;
      const listId = state.notes.findIndex((note) => note.id === noteId);
      state.notes[listId] = action.payload;
      state.toShow = state.notes;
    });
  },
});

export const { all, done, notDone } = notesSlice.actions;

export default notesSlice.reducer;
