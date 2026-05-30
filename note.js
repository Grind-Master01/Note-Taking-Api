require('dotenv').config();
const crypto = require("crypto");

const express = require('express');
const app = express();

app.use (express.json());
const PORT = process.env.PORT ||4000;


let notes = [
  { id : crypto.randomBytes(4).readUInt32BE(0), title: " I'd Rather Be Writing ", author: "Tom Johnson", description: " Tom Johnson is a senior technical writer at Google and a widely recognized authority in the technical communications field. He is best known for his blog and extensive API Documentation Course hosted on I'd Rather Be Writing, which serves as a definitive resource for writers transitioning into developer documentation. The I'd Rather Be Writing course is a comprehensive, self-paced guide designed to help technical writers understand the tools and methodologies required for high level developer documentation." },
  { id : crypto.randomBytes(4).readUInt32BE(0), title: "Twilio's Developer Education team", author: "John Leo", description: "Twilio's Developer Education team provides curated open-source notes for beginners through the TwilioDevEd/introduction-to-apis-notes repository on GitHub. These notes accompany a comprehensive course designed to break down the fundamentals of Application Programming Interfaces (APIs). The course is structured into units that guide you from basic concepts to building functional applications." },
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



 app.post ('/notes', (req, res) => {
  
  res.status(201).json({ error: "Input invalid"});
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





