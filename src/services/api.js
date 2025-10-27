import axios from 'axios';

// Base URL 
const API_BASE_URL = 'https://kanji-flash-backend-v2.onrender.com';

export const getKanjiList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/kanji`);
    return response.data;  // Returns the array of Kanji objects
  } catch (error) {
    console.error('Error fetching Kanji data from API:', error);
    throw error;  // Rethrow the error for the caller to handle
  }
};

export default getKanjiList;