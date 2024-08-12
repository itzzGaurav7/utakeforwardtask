import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Card.css";

const colors = {
  cardFront: ["#A02334", "#FFAD60", "#FFEEAD", "#96CEB4"],
  cardBack: ["#A02334", "#FFAD60", "#FFEEAD", "#96CEB4"],
};

const getRandomColor = (colorArray) => {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
};

const updateColors = () => {
  let color = getRandomColor(colors.cardFront);
  let color2 = getRandomColor(colors.cardBack);
  document.documentElement.style.setProperty("--card-front-bg-color", color);
  document.documentElement.style.setProperty("--card-back-bg-color", color2);
  document.documentElement.style.setProperty("--button-bg-color", color);
  document.documentElement.style.setProperty("--button-hover-bg-color", color2);
};

const Card = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setFlipped] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_SERVER_URI + "flashcards"
        );
        // console.log(process.env.REACT_APP_SERVER_URI + "flashcards");
        setFlashcards(response.data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();
    updateColors();
  }, []);

  const handleFlip = () => {
    setFlipped(!isFlipped);
  };

  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setFlipped(false);
    updateColors();
  };

  const handlePrevious = () => {
    setCurrentCard(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    );
    setFlipped(false);
    updateColors();
  };

  if (flashcards.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="container">
        <div
          className={`flip-card ${isFlipped ? "flipped" : ""}`}
          onClick={handleFlip}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card-content">
                {flashcards[currentCard].question}
              </div>
            </div>
            <div className="flip-card-back">
              <div className="card-content">
                {flashcards[currentCard].answer}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Card;
