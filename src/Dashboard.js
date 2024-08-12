import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState({ question: "", answer: "" });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URI + "flashcards"
      );
      setFlashcards(response.data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(
        process.env.REACT_APP_SERVER_URI + "flashcards",
        currentCard
      );

      fetchFlashcards();
      setCurrentCard({ question: "", answer: "" });
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      await axios.put(
        process.env.REACT_APP_SERVER_URI + "flashcards/" + id,
        currentCard
      );
      fetchFlashcards();
      setCurrentCard({ question: "", answer: "" });
      setEditMode(false);
    } catch (error) {
      console.error("Error editing flashcard:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(process.env.REACT_APP_SERVER_URI + "flashcards/" + id);
      fetchFlashcards();
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Flashcard Dashboard</h1>
      <div className="form-container">
        <h2>{editMode ? "Edit Flashcard" : "Add Flashcard"}</h2>
        <input
          type="text"
          placeholder="Question"
          value={currentCard.question}
          onChange={(e) =>
            setCurrentCard({ ...currentCard, question: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Answer"
          value={currentCard.answer}
          onChange={(e) =>
            setCurrentCard({ ...currentCard, answer: e.target.value })
          }
        />
        <button
          onClick={() => (editMode ? handleEdit(currentCard._id) : handleAdd())}
          className="add_button"
        >
          {editMode ? "Update" : "Add"}
        </button>
      </div>
      <div className="flashcard-list">
        <h2>Flashcard List</h2>
        <ul>
          {flashcards.map((card) => (
            <li key={card._id}>
              <div className="flashcard-item">
                <div className="flashcard-content">
                  <div>
                    <strong>Question:</strong> {card.question}
                    <br />
                  </div>
                  <div>
                    <strong>Answer:</strong> {card.answer}
                  </div>
                </div>
                <div className="action-buttons">
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditMode(true);
                      setCurrentCard(card);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(card._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
