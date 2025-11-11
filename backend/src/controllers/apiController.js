import privateApiService from "../services/privateApiService.js";
import publicApiService from '../services/publicApiService.js';

// Función para buscar jugadores por nombre
const searchPlayers = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) return res.status(400).json({ error: 'El nombre es requerido' });

        const data = await publicApiService.getData('/profiles', {search: name});
        res.json(data.data);

    } catch (error) {
        console.error('Error en searchPlayers:', error);
        res.status(500).json({ error: 'Error buscando jugadores' });
    }
};


// Función para obtener estadísticas de un jugador
const getPlayerStats = async (req, res) => {
    try {
        const { id } = req.query;
        const { season } = req.query;

        if (!id) return res.status(400).json({error: 'El ID es requerido'});
        if (!season) return res.status(400).json({error: 'La temporada es requerida'});
        if (season < 2021 || season > 2023) return res.status(400).json({error: 'La temporada debe estar entre 2021 y 2023'});


        const data = await publicApiService.getData('', { id: id, season: season});
        res.json(data.data);

    } catch (error) {
        console.error('Error en getPlayerStats:', error);
        res.status(500).json({ error: 'Error buscando jugadores' });
    }
};



// Función para buscar fotos en Pexels
const searchPhotos = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: 'Introduce el tema de la foto que quieres buscar...' });
        }

        const params = { per_page: 1, query: query };

        // Llamamos a la función de búsqueda
        const data = await privateApiService.getData(params);

        // Respondemos con los resultados
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: 'Error en la API de Pexels', details: error.message });
    }
};


export {
    searchPlayers,
    getPlayerStats,
    searchPhotos,
};
