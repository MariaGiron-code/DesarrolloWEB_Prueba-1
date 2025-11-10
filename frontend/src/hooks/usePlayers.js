import { useState } from 'react';
import api from '../services/api';

export const usePlayers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const searchPlayers = async (name) => {
    if (!name || name.trim() === '') {
      setError('El nombre del jugador es obligatorio para la búsqueda');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/players/search?name=${encodeURIComponent(name)}`);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Error al buscar jugadores';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    // Estados
    loading,
    error,
    data,
    // Funciones
    searchPlayers,
    clearData,
    clearError,
  };
};

export default usePlayers;