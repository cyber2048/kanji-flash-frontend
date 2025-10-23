import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import FlipCard from './FlipCard';
import './SavedKanji.css';

function SavedKanji() {
  const [savedKanji, setSavedKanji] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchSavedKanji();
  }, []);

  const fetchSavedKanji = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/saved-kanji', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setSavedKanji(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching saved kanji:', error);
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm('Remove this kanji from saved list?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/saved-kanji/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSavedKanji(savedKanji.filter(k => k._id !== id));
        if (currentIndex >= savedKanji.length - 1) {
          setCurrentIndex(Math.max(0, savedKanji.length - 2));
        }
      }
    } catch (error) {
      console.error('Error removing kanji:', error);
    }
  };

  if (loading) return <div className="loading">Loading saved kanji...</div>;
  if (!savedKanji.length) {
    return (
      <div className="empty-state">
        <h2>📭 No Saved Kanji Yet</h2>
        <p>Go to Practice tab and save some kanji to review later!</p>
      </div>
    );
  }

  const currentKanji = savedKanji[currentIndex];

  return (
    <div className="saved-container">
      <div className="progress-info">
        Saved Kanji {currentIndex + 1} of {savedKanji.length}
      </div>

      <FlipCard 
        kanji={currentKanji.kanji} 
        meaning={currentKanji.meaning} 
        hint={currentKanji.hint} 
      />

      <div className="control-buttons">
        <button 
          onClick={() => setCurrentIndex((prev) => (prev - 1 + savedKanji.length) % savedKanji.length)}
          className="nav-btn"
          disabled={savedKanji.length <= 1}
        >
          ⬅️ Previous
        </button>

        <button 
          onClick={() => handleRemove(currentKanji._id)}
          className="remove-btn"
        >
          🗑️ Remove
        </button>

        <button 
          onClick={() => setCurrentIndex((prev) => (prev + 1) % savedKanji.length)}
          className="nav-btn"
          disabled={savedKanji.length <= 1}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
}

export default SavedKanji;