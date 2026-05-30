require('dotenv').config();
const crypto = require("crypto");

const express = require('express');
const app = express();

app.use (express.json());
const PORT = process.env.PORT ||4000;


let notes = [
  { id : crypto.randomBytes(4).readUInt32BE(0), title: "Express.js Routing", author: "John Dee", description: "Handles how an app responds to different URL requests using HTTP methods." },
  { id : crypto.randomBytes(4).readUInt32BE(0), title: "CRUD Operations in Express", author: "John Leo", description: "Basic operations to create, read, update, and delete data in an API." },
  { id : crypto.randomBytes(4).readUInt32BE(0), title: "API Testing with Postman", author: "John bay", description: "Tool used to test API endpoints and check responses." },
  { id : crypto.randomBytes(4).readUInt32BE(0), title: "Middleware in Express", author: "John Gee", description: "Functions that run between request and response to process data or control flow." },
];

//GET ALL NOTES
app.get('/notes', (req,res) => {
  res.status(200).json(notes);
});

//GET NOTE FOR ID
app.get('/notes/:id', (req, res, next) =>{
  try {
    const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({error : "Input is not a number"});
  const getNotes = notes.find(note => note.id === id);
  if (!getNotes) return res.status(404).json({error:"Note not found"});
  return res.status(200).json(getNotes);
  } catch (error) {
    next(error);
  }

});
//POST NOTE - CREATE
app.post('/notes', (req, res, next) => {
  try {
    const { title, author, description } = req.body;
    if(!title || !author || !description) return res.status(400).json({ error: "All fields are required" });
    const id = crypto.randomBytes(4).readUInt32BE(0);
    const newNote = { id, title, author, description };
    notes.push(newNote);
    res.status(201).json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    next(error);
  }
});
app.patch('/notes/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Input is not a number" });
    const note= notes.find(note => note.id === id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    Object.assign(note, req.body);
    return res.status(200).json(note);
  } catch (error) {
    next(error);
  }
});
//DELETE NOTE
app.delete('/notes/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Input is not a number" });
    const note = notes.find(note => note.id === id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    notes = notes.filter(note => note.id !== id);
    return res.status(204).json({ message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
});

app.use ((err, req, res, next) => {
  res.status(500).json({ error: "Server error!"});
});

app.listen(PORT, () => {
  console.log(`Note Api is Active on http://localhost:${PORT}`);
});




// //GET NOTE FOR ID
// app.get('/notes/:id', (req, res, next) =>{
//   try {
//     const id = req.params.id;
//   if (id == isNaN) return res.status(404).json({error : "Input is not a number"});
//   //  res.status(200).json (req.Params.id)
//   const getNotes = notes.find((id => id === notes.id));
//   if (getNotes === undefined) return res.status(404).json({error:"Note not found"});
//   return res.status(200).json({message: getNotes})
//   } catch (error) {
//     next(error);
//   }
// });





