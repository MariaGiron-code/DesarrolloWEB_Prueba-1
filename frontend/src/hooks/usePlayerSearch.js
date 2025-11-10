import { useState, useCallback } from 'react';
import { usePlayers } from './usePlayers';
import { usePlayerStats } from './usePlayerStats';

export const usePlayerSearch = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  const { searchPlayers, loading: searchLoading, error: searchError } = usePlayers();
  const { getPlayerStats, loading: statsLoading, error: statsError } = usePlayerStats();

  // Buscar jugadores y obtener estadísticas del primero
  const searchAndGetStats = useCallback(async (name) => {
    if (!name || name.trim() === '') {
      return;
    }

    setIsSearching(true);
    setSearchResults([]);
    setSelectedPlayer(null);

    try {
      // 1.- Buscar jugadores
      const players = await searchPlayers(name);
      
      if (!players || players.length === 0) {
        return;
      }

      // 2.- Procesar resultados para mostrar solo información importante del jugador
      const processedResults = players.map((player, index) => ({
        id: player.id, // Mantener ID internamente
        name: player.name || player.firstname + ' ' + player.lastname,
        team: player.team?.name || 'N/A',
        position: player.position || 'N/A',
        age: player.age || 'N/A',
        nationality: player.nationality || 'N/A',
        photo: player.photo || '',
        // Solo el primer jugador  que se consulta obtiene las estadísticas
        stats: index === 0 ? null : undefined
      }));

      setSearchResults(processedResults);

      // 3. Obtener estadísticas del primer jugador
      if (processedResults[0]) {
        setIsLoadingStats(true);
        try {
          const stats = await getPlayerStats(processedResults[0].id);
          const playerWithStats = {
            ...processedResults[0],
            stats: stats
          };
          
          setSelectedPlayer(playerWithStats);
          
          // Actualizar la lista con estadísticas del primer jugador
          setSearchResults(prev => 
            prev.map((player, index) => 
              index === 0 ? playerWithStats : player
            )
          );
        } catch (statsErr) {
          console.warn('No se pudieron obtener estadísticas:', statsErr);
        } finally {
          setIsLoadingStats(false);
        }
      }

    } catch (error) {
      console.error('Error en búsqueda:', error);
    } finally {
      setIsSearching(false);
    }
  }, [searchPlayers, getPlayerStats]);

  // Obtener estadísticas de un jugador en específico
  const getPlayerDetails = useCallback(async (player) => {
    setIsLoadingStats(true);
    try {
      const stats = await getPlayerStats(player.id);
      const playerWithStats = { ...player, stats };
      setSelectedPlayer(playerWithStats);
      return playerWithStats;
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      throw error;
    } finally {
      setIsLoadingStats(false);
    }
  }, [getPlayerStats]);

  // Limpiar búsqueda
  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setSelectedPlayer(null);
    setIsSearching(false);
    setIsLoadingStats(false);
  }, []);

  return {
    // Estados principales
    searchResults,           // Lista de jugadores (sin ID visible al usuario)
    selectedPlayer,          // Jugador seleccionado con estadísticas
    isSearching,            // Buscando jugadores
    isLoadingStats,         // Cargando estadísticas
    
    // Estados de errores combinados
    error: searchError || statsError,
    loading: searchLoading || statsLoading,

    // Estados individuales para UI
    searchLoading,
    statsLoading,
    searchError,
    statsError,

    // Funciones principales
    searchAndGetStats,      // Buscar + obtener stats del primer resultado
    getPlayerDetails,       // Obtener detalles de un jugador específico
    clearSearch,            // Limpiar búsqueda
    
    // Helpers para la UI
    hasResults: searchResults.length > 0,
    hasSelectedPlayer: !!selectedPlayer,
    isFirstPlayerSelected: selectedPlayer && searchResults[0] && 
                          selectedPlayer.id === searchResults[0]?.id
  };
};

export default usePlayerSearch;