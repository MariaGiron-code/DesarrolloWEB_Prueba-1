const publicApiService = require('../services/publicApiService');
const privateApiService = require('../services/privateApiService');

// Función para buscar jugadores por nombre
const searchPlayers = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'El parámetro name es requerido' });
    }
    const endpoint = `players?search=${encodeURIComponent(name)}`;
    const data = await publicApiService.getData(endpoint);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error buscando jugadores' });
  }
};

// Función para obtener estadísticas de un jugador
const getPlayerStats = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'El ID del jugador es requerido' });
    }
    const endpoint = `players?id=${id}`;
    const data = await publicApiService.getData(endpoint);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo estadísticas del jugador' });
  }
};

// Función para buscar videos relacionados en YouTube
const searchVideos = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'El parámetro query es requerido' });
    }
    const endpoint = `search/?q=${encodeURIComponent(query)}&hl=en&gl=US`;
    const data = await privateApiService.getData(endpoint);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error buscando videos en YouTube' });
  }
};

module.exports = {
  searchPlayers,
  getPlayerStats,
  searchVideos,
};