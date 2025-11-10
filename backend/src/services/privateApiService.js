const axios = require('axios');

const PRIVATE_API_URL = process.env.PRIVATE_API_URL;
const PRIVATE_API_KEY = process.env.PRIVATE_API_KEY;

const privateApiService = {
  async getData(endpoint) {
    try {
      const response = await axios.get(`${PRIVATE_API_URL}/${endpoint}`, {
        headers: {
          'X-RapidAPI-Key': PRIVATE_API_KEY,
          'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching from YouTube API:', error.message);
      throw new Error('Error fetching data from YouTube API');
    }
  },

  async postData(endpoint, data) {
    try {
      const response = await axios.post(`${PRIVATE_API_URL}/${endpoint}`, data, {
        headers: {
          'X-RapidAPI-Key': PRIVATE_API_KEY,
          'X-RapidAPI-Host': 'youtube138.p.rapidapi.com',
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error posting to YouTube API:', error.message);
      throw new Error('Error posting data to YouTube API');
    }
  }
};

module.exports = privateApiService;