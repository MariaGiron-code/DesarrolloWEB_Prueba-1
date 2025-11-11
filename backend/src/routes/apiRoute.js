// Importamos el módulo Router de Express
import {Router} from 'express'


// Importamos las funciones controladoras desde el archivo apiController.js
// Estas contienen la lógica para cada endpoint (búsqueda de jugadores, estadísticas y fotos)
import {getPlayerStats, searchPhotos, searchPlayers} from '../controllers/apiController.js';


// Creamos una nueva instancia del enrutador de Express
// Esto nos permite definir rutas separadas de la configuración principal del servidor
const router = Router();



// ---------------------------
// 📌 RUTAS DE LA API DE FÚTBOL
// ---------------------------

// Ruta para buscar jugadores por nombre
// Ejemplo de uso: GET /api/players?name=Messi
router.get('/players', searchPlayers);


// Ruta para obtener las estadísticas de un jugador específico
// Ejemplo de uso: GET /api/stats?id=123&season=2022
router.get('/stats', getPlayerStats);


// Ruta para buscar fotos relacionadas con un tema (usando Pexels API)
// Ejemplo de uso: GET /api/photos?query=futbol
router.get('/photos', searchPhotos);


// Exportamos el enrutador para usarlo en el archivo principal del servidor (server.js)
// Normalmente se monta con app.use('/api', router);
export default router;
