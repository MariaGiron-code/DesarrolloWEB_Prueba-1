import {Router} from 'express'
import {getPlayerStats, searchPhotos, searchPlayers,} from '../controllers/apiController.js';

const router = Router();

// Rutas específicas para la aplicación de fútbol
router.get('/players', searchPlayers);
router.get('/stats', getPlayerStats);
router.get('/photos', searchPhotos);

export default router;
