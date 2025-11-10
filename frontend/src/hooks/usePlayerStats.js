import { useState } from 'react';
import api from '../services/api';

export const usePlayerStats = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getPlayerStats = async (playerId) => {
    if (!playerId) {
      setError('El ID del jugador es requerido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/players/${playerId}/stats`);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Error al obtener estadísticas del jugador';
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
    getPlayerStats,
    clearData,
    clearError,
  };
};

export default usePlayerStats;