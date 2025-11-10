import { useState } from 'react';
import api from '../services/api';

export const useVideos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const searchVideos = async (query) => {
    if (!query || query.trim() === '') {
      setError('La consulta de búsqueda es requerida');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/videos/search?query=${encodeURIComponent(query)}`);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Error al buscar videos';
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
    // estados
    loading,
    error,
    data,
    // Funciones
    searchVideos,
    clearData,
    clearError,
  };
};

export default useVideos;