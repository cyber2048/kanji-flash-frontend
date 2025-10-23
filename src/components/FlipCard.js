// src/FlipCard.js
import React, { useState } from 'react';
import './Flipcard.css';  // You'll create this CSS file next

function FlipCard({ kanji, meaning, hint }) {
  const [isFlipped, setIsFlipped] = useState(false);  // State to track if the card is flipped

  return (
    <div className="flip-card-container">
      <div 
        className={`flip-card ${isFlipped ? 'is-flipped' : ''}`} 
        onClick={() => setIsFlipped(!isFlipped)}  // Flip on click
      >
        {/* Front of the card */}
        <div className="flip-card-front">
          <h2>{kanji}</h2>
        </div>
        
        {/* Back of the card */}
        <div className="flip-card-back">
          <h3>Meaning: {meaning}</h3>
          <p>Hint: {hint}</p>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;