import  express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {  createUser, createNote, getNotes, editNote, removeNote, removeAllNotes, findUser } from "./database.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SECRET_KEY } from "./config.js";

const app = express();

const generateToken = (id) =>{

    const payload = {
      userId: id,
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "6h" });
}

const getToken = (token)=>{
    return jwt.verify(token, SECRET_KEY)
}
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());
app.use(express.json())

app.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await findUser(login);
    if (!user) {
      res.status(400).send({ message: `wrong login` });
    }
    if (user) {
      const validPassword = bcrypt.compareSync(password, user.password);
      if (validPassword) {
        const token = generateToken(user._id);
        res.json(token);
      }
      if (!validPassword) {
        res.status(400).send({message: "invalid password"})
      }
    }
  } catch (error) {
    res.send(error);
  }
});


app.post('/registration', async (req, res)=> {
    try {
      const { login, password } = req.body;
      const user = await findUser(login);
      if (user) {
        res.status(400).json({ message: `user  allredy exist` });
      }
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 7);
        await createUser(login, hashedPassword);
        res.status(201).send("Registration succesfull");
      }
    } catch (error) {
      res.send(error);
    }
})



app.get('/notes', async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { userId } = getToken(token);
      const notes = await getNotes(userId);
      res.json(notes);
    } catch (error) {
      res.send(error)
    }
})

app.post('/note', async(req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { text } = req.body;
      const { userId } = getToken(token);
      const note = await createNote(text, userId);
      res.json(note);
    } catch (error) {
      res.send(error)
    }
})

app.put('/note', async (req, res) => {
    try {
      const { text, id, status } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      const { userId } = getToken(token);
      const editedNote = await editNote(text, id, userId, status);
      if (editedNote.status === 1) {
        editedNote.status = true;
      } else editedNote.status = false;
      res.json(editedNote);
    } catch (error) {
      res.send(error)
    }
})
app.delete('/note', async (req, res) => {
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
      res.send(error)
    }
})

app.delete("/notes", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { userId } = getToken(token);
    const result = await removeAllNotes(userId);
    if (result) {
      res.status(200).json({ message: "all notes deleted" });
    }
  } catch (error) {
    res.send(error)
  }
});

app.listen(8080, ()=> console.log(`server started at 8080 port`))