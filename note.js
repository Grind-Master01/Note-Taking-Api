require('dotenv').config();
const crypto = require("crypto");

const express = require('express');
const app = express();

app.use (express.json());
const PORT = process.env.PORT ||4000;


let notes = [
  { id : crypto.randomBytes(4).readUInt32BE(0), title: "Backend Course", author: "John Dee", description: "Learn backend development with Node.js and Express.js " },
  { id : crypto.randomBytes(4).readUInt32BE(0), title: "Backend Course", author: "John Leo", description: "Learn backend development with Node.js and Express.js " },
  { id : crypto.randomBytes(4).readUInt32BE(0), title: "Backend Course", author: "John bay", description: "Learn backend development with Node.js and Express.js " },
  { id : crypto.randomBytes(4).readUInt32BE(0), title: "Backend Course", author: "John Gee", description: "Learn backend development with Node.js and Express.js " },
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
  
  const getNotes = notes.find(( notes => notes.id ===id));

  if (!getNotes) {
     return res.status(404).json({error:"Note not found"});
     }
  return res.status(200).json({message: getNotes});
  } catch (error) {
    next(error);
  }
});



// app,post('/notes', (req, res) => {

// })

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





