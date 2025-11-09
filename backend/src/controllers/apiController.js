const publicApiService = require('../services/publicApiService');
const privateApiService = require('../services/privateApiService');
const Ejemplo = require('../models/Ejemplo');

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

const getPublicApiData = async (req, res) => {
  try {
    const data = await publicApiService.getData(req.query.endpoint || '');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from public API' });
  }
};

const postPublicApiData = async (req, res) => {
  try {
    const data = await publicApiService.postData(req.query.endpoint || '', req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error posting data to public API' });
  }
};

const getPrivateApiData = async (req, res) => {
  try {
    const data = await privateApiService.getData(req.query.endpoint || '');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from private API' });
  }
};

const postPrivateApiData = async (req, res) => {
  try {
    const data = await privateApiService.postData(req.query.endpoint || '', req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error posting data to private API' });
  }
};

const getEjemplos = async (req, res) => {
  try {
    const ejemplos = await Ejemplo.find();
    res.json(ejemplos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching ejemplos' });
  }
};

const createEjemplo = async (req, res) => {
  try {
    const nuevoEjemplo = new Ejemplo(req.body);
    const ejemploGuardado = await nuevoEjemplo.save();
    res.status(201).json(ejemploGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Error creating ejemplo' });
  }
};

module.exports = {
  getPublicApiData,
  postPublicApiData,
  getPrivateApiData,
  postPrivateApiData,
  getEjemplos,
  createEjemplo,
  searchPlayers,
  getPlayerStats,
  searchVideos,
};