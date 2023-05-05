import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {
  createUser,
  createNote,
  getNotes,
  editNote,
  removeNote,
  removeAllNotes,
  findUser,
  toggleStatus,
  getNote
} from "./database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET_KEY } from "./config.js";

const app = express();

const PORT = 8080;

const generateToken = (id) => {
  const payload = {
    userId: id,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "6h" });
};

const getToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res)=>{
  res.json("Hi there! Visit my vebsite - my-notes-reactapp.netlify.app");
})

app.get('/verify', async(req, res)=> {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { userId } = getToken(token);
      if (userId) {
        res.sendStatus(200);
      } else res.sendStatus(404);
    } catch (error) {
      
    }
})
app.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await findUser(login);

    if (!user) {
      res.status(400).json(`User does not exist`);
    }
    if (user) {
      const validPassword = bcrypt.compareSync(password, user.password);
      if (validPassword) {
        const token = generateToken(user.user_id);
        res.status(200).json(token);
      }
      if (!validPassword) {
        res.status(400).json( "Invalid password");
      }
    }
  } catch (error) {
    res.status(500).json({ server: "connection error" });
  }
});

app.post("/registration", async (req, res) => {
  try {
    const { login, password, email } = req.body;
    const user = await findUser(login);
    if (user) {
      res.status(400).json(`user already exist`);
    }
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 7);
      const message = await createUser(login, hashedPassword, email);
      if (message.ok) {
        res.status(201).json("Registration succesfull");
      }
    }
  } catch (error) {
    res.status(500).json("connection error" );
  }
});

app.get("/notes", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { userId } = getToken(token);
    const notes = await getNotes(userId);
    notes.forEach(note => {
      if (note.status===0) {
        return note.status = false
      }else return note.status = true
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ server: "connection error" });
  }
});

app.post("/note", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { title, text } = req.body;
    const { userId } = getToken(token);
    const note = await createNote(title, text, userId);
    if(note){
       if (note.status === 0) {
         note.status = false;
       } else note.status = true;
      res.status(201).json(note);
    }
  } catch (error) {
    res.status(500).json({ server: "connection error" });
  }
});

app.put("/note", async (req, res) => {
  try {
    const { title, text, id } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const { userId } = getToken(token);
    const editedNote = await editNote(title, text, id, userId);
    if (editedNote.status === 0) {
      editedNote.status = false;
    } else editedNote.status = true;
    res.json(editedNote);
  } catch (error) {
    res.status(500).json({ server: "connection error" });
  }
});
app.put("/note-status", async (req, res) => {
  try {
    const { id } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const { userId } = getToken(token);
    const note = await getNote(id, userId);
    if (note.status === 0) {
      await toggleStatus(id, userId, 1)
    } else await toggleStatus(id, userId, 0);

    const editedNote = await getNote(id, userId);
    if (editedNote.status === 0){
      editedNote.status = false;
    } else editedNote.status = true;
    res.json(editedNote);
  } catch (error) {
    res.status(500).json({ server: "connection error" });
  }
});

app.delete("/note", async (req, res) => {
  try {
    const { id } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const { userId } = getToken(token);
    const result = await removeNote(id, userId);
    if (!result) {
      res.send("something wrong");
    }
    if (result.deleted === 0) {
      res.status(400).json({ message: "not found" });
    }
    if (result.deleted === 1) {
      res.status(200).json({ message: "deleted" });
    }
  } catch (error) {
    res.status(500).json({ server: "connection error" });
  }
});

app.delete("/notes", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { userId } = getToken(token);
    const result = await removeAllNotes(userId);
    if (result) {
      res.status(200).json({ message: "all notes deleted" });
    }
  } catch (error) {
    res.status(500).json({ server: "connection error" });
  }
});

app.listen(PORT, () => console.log(`server started at 8080 port`));
