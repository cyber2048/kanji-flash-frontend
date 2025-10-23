import axios from 'axios';

// Base URL for your backend API (update if your server is on a different port or domain)
const API_BASE_URL = 'http://localhost:5000';

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