import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PracticeKanji from './PracticeKanji';
import SavedKanji from './SavedKanji';
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('practice');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>KANJI-WADA : Your Japanese learning aid</h1>
        <div className="user-info">
          <span>Welcome, {user?.username}!</span>
          <span>Day {} of streak!</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'practice' ? 'active' : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          📚 Practice Kanji
        </button>
        <button 
          className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          ⭐ Saved Kanji
        </button>
      </div>

      {/* Tab Content */}
 <div className="tab-content">
  <div style={{ display: activeTab === 'practice' ? 'block' : 'none' }}>
    <PracticeKanji />
  </div>
  <div style={{ display: activeTab === 'saved' ? 'block' : 'none' }}>
    <SavedKanji />
  </div>
</div>
    </div>
  );
}

export default Dashboard;