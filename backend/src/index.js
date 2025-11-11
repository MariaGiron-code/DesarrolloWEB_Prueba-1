// Importamos la aplicación Express configurada en ‘server.js’
// Este archivo (server.js) normalmente contiene toda la configuración del servidor:
// middlewares, rutas, controladores, etc.
import app from './server.js';

// Iniciamos el servidor escuchando el puerto definido en la configuración de Express
app.listen(
    app.get('port'), // Obtenemos el número de puerto desde la configuración
    () => console.log(`✅ Server ok on http://localhost:${app.get('port')}`) // Mensaje de confirmación en consola
);
