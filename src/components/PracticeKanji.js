import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import FlipCard from './FlipCard';
import getKanjiList from '../services/api';
import './PracticeKanji.css';

function PracticeKanji() {
  const [kanjiList, setKanjiList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
  const cached = localStorage.getItem('kanjiList');

  if (cached) {
    // ✅ If we already have data saved locally, use it
    setKanjiList(JSON.parse(cached));
    setLoading(false);
    return; // 🔁 Skip the network request
  }

  // Otherwise fetch from API
  const fetchData = async () => {
    try {
      console.log("Fetching kanji list from server...");
      const data = await getKanjiList();

      // ✅ Save a copy in localStorage for next time
      localStorage.setItem('kanjiList', JSON.stringify(data));

      setKanjiList(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoading(false);
    }
  };

  fetchData();
}, []);


  const handleSaveKanji = async () => {
    const currentKanji = kanjiList[currentIndex];
    
    // Get token from context or localStorage as fallback
    const authToken = token || localStorage.getItem('token');
    
    // console.log('=== DEBUG SAVE KANJI ===');
    // console.log('Token from context:', token);
    // console.log('Token from localStorage:', localStorage.getItem('token'));
    // console.log('Using token:', authToken);
    // console.log('Current Kanji:', currentKanji);

    if (!authToken) {
      setSaveMessage('❌ Not authenticated. Please log in again.');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/saved-kanji', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          kanjiId: currentKanji.id,
          kanji: currentKanji.kanji,
          meaning: currentKanji.meaning,
          hint: currentKanji.hint,
          romaji:currentKanji.romaji,
          kana:currentKanji.kana,
          jlpt_level:currentKanji.jlpt_level
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setSaveMessage('✅ Kanji saved successfully!');
      } else {
        setSaveMessage(`⚠️ ${data.message || 'Failed to save kanji'}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveMessage('❌ Error saving kanji');
    }

    // Clear message after 3 seconds
    setTimeout(() => setSaveMessage(''), 3000);
  };

  if (loading) return <div className="loading">Loading kanji...</div>;
  if (!kanjiList.length) return <div className="loading">No kanji available</div>;

  const currentKanji = kanjiList[currentIndex];

  return (
    <div className="practice-container">
      <div className="progress-info">
        Kanji {currentIndex + 1} of {kanjiList.length}
      </div>

      <FlipCard 
        kanji={currentKanji.kanji} 
        meaning={currentKanji.meaning} 
        hint={currentKanji.hint} 
        romaji={currentKanji.romaji}
        kana={currentKanji.kana}
        jlpt_level={currentKanji.jlpt_level}
      />

      {saveMessage && (
        <div className="save-message">{saveMessage}</div>
      )}

      <div className="control-buttons">
        <button 
          onClick={() => setCurrentIndex((prev) => (prev - 1 + kanjiList.length) % kanjiList.length)}
          className="nav-btn"
        >
          ⬅️ Previous
        </button>

        <button 
          onClick={handleSaveKanji}
          className="save-btn"
        >
          ⭐ Save Kanji
        </button>

        <button 
          onClick={() => setCurrentIndex((prev) => (prev + 1) % kanjiList.length)}
          className="nav-btn"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
}

export default PracticeKanji;