import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;









// // App.js
// import React, { useState, useEffect } from 'react';
// import FlipCard from './components/FlipCard'; 
// import  getKanjiList from './services/api'


// function App() {
//   const [kanjiList, setKanjiList] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//  useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getKanjiList();  // Use the API function
//         setKanjiList(data);
//       } catch (error) {
//         console.error('Failed to fetch data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   if (!kanjiList.length) return <div>Loading...</div>;

//   const currentKanji = kanjiList[currentIndex];

//    return (
//             <AuthProvider>
//                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f0f8ff' }}>
//       <h1>KanjiFlash App</h1>
//       {kanjiList.length > 0 && (
//         <FlipCard 
//           kanji={kanjiList[currentIndex].kanji} 
//           meaning={kanjiList[currentIndex].meaning} 
//           hint={kanjiList[currentIndex].hint} 
//         />
//       )}
//       <button onClick={() => setCurrentIndex((prev) => (prev + 1) % kanjiList.length)}>Next</button>
//       <button onClick={() => setCurrentIndex((prev) => (prev - 1 + kanjiList.length) % kanjiList.length)}>Previous</button>
//     </div>
//             </AuthProvider>


 
//   );
// }

// export default App;

