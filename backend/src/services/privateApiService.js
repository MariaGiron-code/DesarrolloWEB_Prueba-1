// Importamos la función ‘createClient’ desde el paquete oficial de Pexels
// Este cliente nos permite conectarnos a la API de Pexels de forma autenticada
import {createClient} from 'pexels';


// Importamos la clave privada desde el archivo .env
import {PRIVATE_API_KEY} from '../config.js';


// Creamos una instancia del cliente de Pexels usando nuestra API key privada
const client = createClient(PRIVATE_API_KEY);


// Definimos un servicio (objeto) que centraliza la lógica de conexión con la API privada de Pexels
const privateApiService = {

    // Method asíncrono para obtener datos (fotos) desde Pexels
    // 'params' contiene los parámetros de búsqueda (ejemplo: { query: 'soccer', per_page: 5 })
    async getData(params = {}) {
        try {
            // Llamada al endpoint de búsqueda de fotos de la API de Pexels
            // Retorna directamente la respuesta del cliente (ya es una promesa)
            return await client.photos.search(params);

        } catch (error) {
            // Si ocurre un error (por ejemplo, clave inválida o problema de red),
            // lo mostramos en consola para facilitar la depuración
            console.error('Error fetching from Pexels API:', error.message);

            // Lanzamos un nuevo error para que el controlador que llamó a este servicio lo capture
            throw new Error('Error fetching data from Pexels API');
        }
    }
};

// Exportamos el servicio para poder usarlo en otros archivos
export default privateApiService;
