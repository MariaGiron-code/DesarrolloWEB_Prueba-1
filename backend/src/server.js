const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv'); 

dotenv.config();

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); // Para parsear los JSON 
app.use(express.urlencoded({ extended: true }));
 
// Rutas
app.use('/api', require('./routes/apiRoutes'));

// Puerto
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto # ${PORT}`);
});

module.exports = { app, server };