// Importamos Axios, una librería para hacer peticiones HTTP fácilmente
import axios from "axios";


// Importamos la URL base y la clave de acceso pública desde el archivo de configuración
// Estas variables suelen estar definidas en config.js que apuntan a .env
import {PUBLIC_API_KEY, PUBLIC_API_URL} from '../config.js';


// -------------------------------------------------------------
// 🔧 Función auxiliar para construir la configuración de la petición
// -------------------------------------------------------------
const setQuery = (endpoint, params) => {
    return {
        method: 'GET',                                // Method HTTP
        url: `${PUBLIC_API_URL}${endpoint}`,          // URL completa de la API (base + endpoint)
        params: params,                               // Parámetros de consulta (query string)
        headers: {                                    // Encabezados HTTP necesarios para la API
            'x-rapidapi-key': `${PUBLIC_API_KEY}`     // Clave de acceso (propia de API Sports)
        }
    };
};


// -------------------------------------------------------------
// 🌍 Servicio público para consumir API’s externas
// -------------------------------------------------------------
const publicApiService = {
    // Method asíncrono que recibe el endpoint y parámetros
    async getData(endpoint, params = {}) {
        try {
            // Construimos la configuración de la petición usando la función auxiliar
            const complete = setQuery(endpoint, params);

            // Ejecutamos la solicitud HTTP con Axios
            return await axios.request(complete);

        } catch (error) {
            // Si ocurre un error (red, clave inválida, endpoint incorrecto, etc.),
            // lo mostramos en consola para depurar
            console.error('Error fetching from public API:', error.message);

            // Lanzamos un nuevo error para que el controlador (por ejemplo, searchPlayers)
            // lo capture y devuelva un mensaje adecuado al cliente
            throw new Error('Error fetching data from public API');
        }
    }
};

// Exportamos el servicio para poder usarlo en otros módulos
export default publicApiService;
