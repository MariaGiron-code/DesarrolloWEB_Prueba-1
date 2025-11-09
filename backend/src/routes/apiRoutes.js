const express = require('express');
const router = express.Router();
const {
  getPublicApiData,
  postPublicApiData,
  getPrivateApiData,
  postPrivateApiData,
  getEjemplos,
  createEjemplo,
  searchPlayers,
  getPlayerStats,
  searchVideos,
} = require('../controllers/apiController');

// Rutas para API pública
router.get('/public', getPublicApiData);
router.post('/public', postPublicApiData);

// Rutas para API privada
router.get('/private', getPrivateApiData);
router.post('/private', postPrivateApiData);

// Rutas específicas para la aplicación de fútbol
router.get('/players/search', searchPlayers);
router.get('/players/:id/stats', getPlayerStats);
router.get('/videos/search', searchVideos);

// Rutas para MongoDB (ejemplo)
router.get('/ejemplos', getEjemplos);
router.post('/ejemplos', createEjemplo);

module.exports = router;