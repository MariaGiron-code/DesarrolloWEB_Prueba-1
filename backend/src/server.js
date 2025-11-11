// Importamos los módulos necesarios
import cors from 'cors'; // Permite solicitudes desde otros orígenes (CORS)
import express from 'express'; // Framework para construir el servidor HTTP
import apiRoute from './routes/apiRoute.js'; // Importamos las rutas de la API definidas en otro archivo


// Creamos la aplicación de Express
const app = express();



// ---------------------------------------------------------
// 🧩 MIDDLEWARES
// ---------------------------------------------------------

// Middleware para que Express pueda interpretar el cuerpo (body) de las peticiones en formato JSON
app.use(express.json());

// Middleware para habilitar CORS (permite que el frontend acceda al backend desde otro dominio o puerto)
app.use(cors());



// ---------------------------------------------------------
// ⚙️ CONFIGURACIÓN DEL PUERTO
// ---------------------------------------------------------

// Definimos el puerto en el que correrá el servidor.
// Se usa el puerto definido en las variables de entorno (process.env.PORT)
// o el 5000 por defecto si no se definió otro.
app.set('port', process.env.PORT || 5000);



// ---------------------------------------------------------
// 🚀 RUTA PRINCIPAL
// ---------------------------------------------------------

// Endpoint base para comprobar que el servidor está en funcionamiento
app.get('/', (req, res) => res.send("Server On"));



// ---------------------------------------------------------
// 📦 RUTAS DE LA API
// ---------------------------------------------------------

// Cualquier ruta que empiece con /api será manejada por el enrutador importado (apiRoute)
// Por ejemplo: /api/players, /api/stats, /api/photos
app.use('/api', apiRoute);



// ---------------------------------------------------------
// ⚠️ MANEJO DE RUTAS NO ENCONTRADAS (404)
// ---------------------------------------------------------

// Si se intenta acceder a una ruta que no existe, se devuelve un error 404
app.use((req, res) =>
    res.status(404).send("Endpoint no encontrado - 404")
);



// ---------------------------------------------------------
// 🧾 EXPORTACIÓN
// ---------------------------------------------------------

// Exportamos la instancia de Express para que pueda ser usada en otros archivos,
// como el principal de inicio (index.js)
export default app;
