import dotenv from 'dotenv';

dotenv.config();

export const {
    PUBLIC_API_URL,
    PUBLIC_API_KEY,

    PRIVATE_API_KEY,
} = process.env;
