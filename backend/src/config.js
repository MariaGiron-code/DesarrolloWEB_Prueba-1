// Importamos dotenv, un paquete que carga variables de entorno desde un archivo .env
import dotenv from 'dotenv';

// Ejecutamos la función config() para que dotenv lea el archivo .env
// y agregue sus valores al objeto global process.env
dotenv.config();

// Exportamos las variables de entorno que usaremos en la aplicación
// Aquí hacemos una desestructuración de process.env para obtener solo las necesarias
export const {
    PUBLIC_API_URL,   // URL base de la API pública (API Sports)
    PUBLIC_API_KEY,   // Clave de acceso para la API pública (usada en publicApiService)

    PRIVATE_API_KEY,  // Clave privada para servicios externos como Pexels (usada en privateApiService)
} = process.env;
