// apiServices.js
import axios from 'https://cdn.skypack.dev/axios'; // Use CDN import since it's not React/Vite

const API_URL = 'https://api.partly.com/api/v1/vehicles.search';

const API_KEY = 'YOUR_LONG_TOKEN_HERE'; // Keep this secure

export async function searchVehicle(plateOrVin) {
  try {
    const response = await axios.post(
      API_URL,
      { query: plateOrVin },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}
