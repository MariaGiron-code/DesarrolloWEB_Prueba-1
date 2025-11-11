import {createClient} from 'pexels';
import {PRIVATE_API_KEY} from '../config.js';

const client = createClient(PRIVATE_API_KEY);

const privateApiService = {
    async getData(params = {}) {
        try {
            return await client.photos.search(params);  // Devuelves la respuesta correctamente
        } catch (error) {
            console.error('Error fetching from Pexels API:', error.message);
            throw new Error('Error fetching data from Pexels API');  // Lanza el error si algo sale mal
        }
    }
};

export default privateApiService;
