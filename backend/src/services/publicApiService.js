const axios = require('axios');

const PUBLIC_API_URL = process.env.PUBLIC_API_URL;
const PRIVATE_API_KEY = process.env.PRIVATE_API_KEY;

const publicApiService = {
  async getData(endpoint) {
    try {
      const response = await axios.get(`${PUBLIC_API_URL}/v3/${endpoint}`, {
        headers: {
          'X-RapidAPI-Key': PRIVATE_API_KEY,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching from public API:', error.message);
      throw new Error('Error fetching data from public API');
    }
  },

  async postData(endpoint, data) {
    try {
      const response = await axios.post(`${PUBLIC_API_URL}/v3/${endpoint}`, data, {
        headers: {
          'X-RapidAPI-Key': PRIVATE_API_KEY,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error posting to public API:', error.message);
      throw new Error('Error posting data to public API');
    }
  }
};

module.exports = publicApiService;