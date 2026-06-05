require('dotenv').config();
const crypto = require("crypto");

const express = require('express');
const app = express();

app.use (express.json());
const PORT = process.env.PORT ||4000;


let notes = [
  { id : crypto.randomBytes(8).toString('hex'), title: " I'd Rather Be Writing ",                          author: "Tom Johnson",                                 description: " Tom Johnson is a senior technical writer at Google and a widely recognized authority in the technical communications field. The I'd Rather Be Writing course is a comprehensive, self-paced guide designed to help technical writers understand the tools and methodologies required for high level developer documentation." },
  { id : crypto.randomBytes(8).toString('hex'), title: "Twilio's Developer Education team",                author: "John Leo",                                    description: "Twilio's Developer Education team provides curated open-source notes for beginners through the TwilioDevEd/introduction-to-apis-notes repository on GitHub. These notes accompany a comprehensive course designed to break down the fundamentals of Application Programming Interfaces (APIs)." },
  { id : crypto.randomBytes(8).toString('hex'), title: "Clean Code",                                       author: "Robert C. Martin",                            description: " Teaches the principles of writing, reading, and refactoring clean, maintainable code." },
  { id : crypto.randomBytes(8).toString('hex'), title: "Designing Web APIs",                               author: "Brenda Jin, Saurabh Sahni, and Amir Shevat",  description: " This O'Reilly Media guide explains how to build, scale, and maintain developer-focused platforms. It provides the blueprints needed to design the request-response and event-driven architectures that power modern programmatic note-taking apps." },
  { id : crypto.randomBytes(8).toString('hex'), title: "The Pragmatic Programmer,Your Journey to Mastery", author: "Andrew Hunt and David Thomas",                description: " A foundational classic that offers actionable advice on how to be more productive, :write adaptable code, and build a successful software development career. " },
  { id : crypto.randomBytes(8).toString('hex'), title: "The Design of Web APIs",                           author: " Arnaud Lauret",                              description: " Focuses heavily on the practical, example-packed crafting of intuitive RESTful web interfaces. It outlines the constraints required for a client app (like a web clipper or browser extension) to securely create, read, update, or delete notes. " },
  { id : crypto.randomBytes(8).toString('hex'), title: "The Coming Wave",                                  author: " Mustafa Suleyman and Michael Bhaskar",       description: " Explores how AI and other rapidly developing technologies will shape governments and society. " },
  { id : crypto.randomBytes(8).toString('hex'), title: "The Innovators",                                   author: "Walter Isaacson",                             description: "How a Group of Hackers, Geniuses, and Geeks Made the Digital Revolution,  A deep dive into the historical figures—like Ada Lovelace and Alan Turing—who built the foundation of the modern digital age." },
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
  try {
    const { title, author } = req.body;

     //Validate Input
    if (!title || !author) {
      return res.status(400).json({ error: " Title and author are required" });
    }
     //create new notes
    const newNote = { id: notes.length + 1, title, author };
    notes.push(newNotes);

    res.status(201).json({ error: "Input invalid"});
      
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error!" });
  }
});

app.put('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find(n => n.id === id);
  if (!note) return res.status(404).json({ message: 'Note not found' });

  note.title = req.body.title;
  note.author = req.body.author;
  res.json(note);
});

// PATCH Update – Partial
app.patch('/notes/:id', (req, res) => {
   const id = parseInt(req.params.id);
  const notes = notes.find(n => n.id === id); // Array.find()
  if (!notes) return res.status(404).json({ message: 'Notes not found' });
  Object.assign(notes, req.body); 
  res.status(200).json(notes);
});

// DELETE Remove
app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = notes.length;
  notes = notes.filter((n) => n.id !== id); // Array.filter() – non-destructive
  if (notes.length === initialLength)
    return res.status(404).json({ error: 'Note not found' });
  res.status(204).send(); // Silent success
});


//error handling middleware
app.use ((err, req, res, next) => {
  res.status(500).json({ error: "Server error!"});
});

app.listen(PORT, () => {
  console.log(`Note Api is Active on http://localhost:${PORT}`);
});

