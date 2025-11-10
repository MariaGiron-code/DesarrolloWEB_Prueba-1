const express = require('express');
const router = express.Router();
const {
  searchPlayers,
  getPlayerStats,
  searchVideos,
} = require('../controllers/apiController');

// Rutas específicas para la aplicación de fútbol
router.get('/players/search', searchPlayers);
router.get('/players/:id/stats', getPlayerStats);
router.get('/videos/search', searchVideos);

module.exports = router;