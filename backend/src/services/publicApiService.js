import axios from "axios";

import {PUBLIC_API_KEY, PUBLIC_API_URL} from '../config.js';

const setQuery = (endpoint, params) => {
    return {
        method: 'GET',
        url: `${PUBLIC_API_URL}${endpoint}`,
        params: params,
        headers: {
            'x-rapidapi-key': `${PUBLIC_API_KEY}`
        }
    };
}


const publicApiService = {
    async getData(endpoint, params = {}) {
        try {
            const complete = setQuery(endpoint, params);
            return await axios.request(complete);
        } catch (error) {
            console.error('Error fetching from public API:', error.message);
            throw new Error('Error fetching data from public API');
        }
    }
};

export default publicApiService;
