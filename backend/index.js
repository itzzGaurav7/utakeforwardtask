const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB Connected...");
});

const flashcardSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

// Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Get all flashcards
app.get("/flashcards", async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a flashcard
app.post("/flashcards", async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFlashcard = new Flashcard({ question, answer });
    const savedFlashcard = await newFlashcard.save();
    res.json(savedFlashcard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a flashcard
app.put("/flashcards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const updatedFlashcard = await Flashcard.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );
    res.json(updatedFlashcard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a flashcard
app.delete("/flashcards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFlashcard = await Flashcard.findByIdAndDelete(id);
    res.json(deletedFlashcard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//below is the code for the mysql database hosted locally

// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "flashcard_user",
//   password: "1234",
//   database: "flashcards_db",
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log("MySQL Connected...");
// });

// // REST API routes here

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(Server running on port ${PORT});
// });

// // Get all flashcards
// app.get("/flashcards", (req, res) => {
//   const sql = "SELECT * FROM flashcards";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// });

// // Add a flashcard
// app.post("/flashcards", (req, res) => {
//   const { question, answer } = req.body;
//   const sql = "INSERT INTO flashcards (question, answer) VALUES (?, ?)";
//   db.query(sql, [question, answer], (err, result) => {
//     if (err) throw err;
//     res.json({ id: result.insertId, question, answer });
//   });
// });

// // Update a flashcard
// app.put("/flashcards/:id", (req, res) => {
//   const { id } = req.params;
//   const { question, answer } = req.body;
//   const sql = "UPDATE flashcards SET question = ?, answer = ? WHERE id = ?";
//   db.query(sql, [question, answer, id], (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// });

// // Delete a flashcard
// app.delete("/flashcards/:id", (req, res) => {
//   const { id } = req.params;
//   const sql = "DELETE FROM flashcards WHERE id = ?";
//   db.query(sql, [id], (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// });
