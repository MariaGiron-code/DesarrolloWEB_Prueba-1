// IMPORTACIONES
// Se importan los servicios de la API (funciones que fueron exportadas desde la carpeta de `services`).
import privateApiService from "../services/privateApiService.js";
import publicApiService from '../services/publicApiService.js';


// Función para buscar jugadores por nombre
const searchPlayers = async (req, res) => {
    try {
        // Obtenemos el query param "name" de la petición
        const { name } = req.query;

        // Si no se envió “name” → respondemos con 400 (Bad Request)
        if (!name) return res.status(400).json({ error: 'El nombre es requerido' });

        // Llamada al servicio público que consulta `/profiles` con el parámetro de búsqueda.
        // Se asume que publicApiService.getData hace la petición HTTP y devuelve un objeto con .data
        const data = await publicApiService.getData('/profiles', { search: name });

        // Enviamos al cliente solo el campo data (según el formato esperado)
        res.json(data.data);

    } catch (error) {
        // Logueo del error en el servidor (útil para debugging)
        console.error('Error en searchPlayers:', error);

        // Respuesta genérica de servidor (500). Opcional: mapear errores de la API externa a códigos más precisos.
        res.status(500).json({ error: 'Error buscando jugadores' });
    }
};



// Función para obtener estadísticas de un jugador
const getPlayerStats = async (req, res) => {
    try {
        // Extraemos los parámetros 'id' y 'season' del query string
        const { id } = req.query;
        const { season } = req.query;

        // Validación básica: ‘id' es obligatorio
        if (!id) return res.status(400).json({ error: 'El ID es requerido' });

        // Validación básica: ‘season' es obligatoria
        if (!season) return res.status(400).json({ error: 'La temporada es requerida' });

        // Validación de rango permitido para la temporada
        if (season < 2021 || season > 2023)
            return res.status(400).json({ error: 'La temporada debe estar entre 2021 y 2023' });

        // Llamada al servicio que obtiene datos (probablemente de una API pública o base de datos)
        // Se envían 'id' y 'season' como parámetros
        const data = await publicApiService.getData('', { id: id, season: season });

        // Devolvemos al cliente los datos obtenidos
        res.json(data.data);

    } catch (error) {
        // Si ocurre un error, se registra en consola
        console.error('Error en getPlayerStats:', error);

        // Y se devuelve una respuesta genérica al cliente
        res.status(500).json({ error: 'Error buscando jugadores' });
    }
};



// Función para buscar fotos en Pexels
const searchPhotos = async (req, res) => {
    try {
        // Extraemos el parámetro ‘query’ de la URL (tema o palabra clave de la foto)
        const { query } = req.query;

        // Validamos que se haya enviado una palabra clave
        if (!query) {
            return res.status(400).json({ error: 'Introduce el tema de la foto que quieres buscar...' });
        }

        // Configuramos los parámetros para la API de Pexels
        // 'per_page' define cuántas fotos se devuelven (aquí solo 1)
        const params = { per_page: 1, query: query };

        // Llamamos al servicio privado que hace la petición a la API de Pexels
        const data = await privateApiService.getData(params);

        // Enviamos la respuesta al cliente (tal como la devuelve la API)
        res.json(data);

    } catch (error) {
        // Sí ocurre algún error (por red, credenciales, etc.)
        res.status(500).json({ error: 'Error en la API de Pexels', details: error.message });
    }
};



export {
    searchPlayers,
    getPlayerStats,
    searchPhotos,
};
