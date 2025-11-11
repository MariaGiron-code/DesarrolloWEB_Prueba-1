import cors from 'cors';
import express from 'express'
import apiRoute from './routes/apiRoute.js';

const app = express();

// Middlewares
app.use(express.json()); // Para parsear los JSON
app.use(cors());

// Puerto
app.set('port', process.env.PORT || 5000)

// Ruta Principal
app.get('/', (req, res) => res.send("Server On"))

// Rutas
app.use('/api', apiRoute);

// Manejo de una ruta que no sea encontrada
app.use((req, res) =>
    res.status(404).send("Endpoint no encontrado - 404"))

export default app;
