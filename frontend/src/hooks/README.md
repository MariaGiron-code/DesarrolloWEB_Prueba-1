# Hooks para Conectar Frontend con Backend

## Overview
Este directorio contiene los hooks personalizados para conectar el frontend React con el backend Express que maneja las APIs de fútbol y YouTube.

## Hooks Disponibles

### 1. `usePlayers`
Para buscar jugadores de fútbol.

**Uso:**
```javascript
import { usePlayers } from './hooks/usePlayers';

const PlayerSearch = () => {
  const { searchPlayers, loading, error, data, clearError } = usePlayers();

  const handleSearch = async (name) => {
    try {
      const result = await searchPlayers(name);
      console.log('Jugadores encontrados:', result);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input 
        placeholder="Buscar jugador..." 
        onKeyPress={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
      />
      {loading && <p>Cargando...</p>}
      {data && <p>Encontrados: {data.length} jugadores</p>}
    </div>
  );
};
```

**Métodos:**
- `searchPlayers(name)` - Busca jugadores por nombre
- `clearData()` - Limpia los datos
- `clearError()` - Limpia errores

**Estados:**
- `loading` - Boolean, indica si está cargando
- `error` - String, mensaje de error
- `data` - Object, datos de la respuesta

### 2. `usePlayerStats`
Para obtener estadísticas de un jugador específico.

**Uso:**
```javascript
import { usePlayerStats } from './hooks/usePlayerStats';

const PlayerStats = ({ playerId }) => {
  const { getPlayerStats, loading, error, data, clearError } = usePlayerStats();

  const handleGetStats = async () => {
    try {
      const stats = await getPlayerStats(playerId);
      console.log('Estadísticas:', stats);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleGetStats}>Ver Estadísticas</button>
      {loading && <p>Cargando estadísticas...</p>}
      {data && <p>Estadísticas cargadas</p>}
    </div>
  );
};
```

**Métodos:**
- `getPlayerStats(playerId)` - Obtiene estadísticas del jugador
- `clearData()` - Limpia los datos
- `clearError()` - Limpia errores

### 3. `useVideos`
Para buscar videos relacionados en YouTube.

**Uso:**
```javascript
import { useVideos } from './hooks/useVideos';

const VideoSearch = () => {
  const { searchVideos, loading, error, data, clearError } = useVideos();

  const handleSearchVideos = async (query) => {
    try {
      const videos = await searchVideos(query);
      console.log('Videos encontrados:', videos);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input 
        placeholder="Buscar videos..." 
        onKeyPress={(e) => e.key === 'Enter' && handleSearchVideos(e.target.value)}
      />
      {loading && <p>Cargando videos...</p>}
      {data && <p>Videos encontrados</p>}
    </div>
  );
};
```
**Métodos:**
- `searchVideos(query)` - Busca videos por query
- `clearData()` - Limpia los datos
- `clearError()` - Limpia errores
```

## Hooks Disponibles

### 4. `usePlayerSearch` ⭐ **RECOMENDADO**
**Hook completo que maneja toda la búsqueda de jugadores + estadísticas.**

**Características especiales:**
- ✅ Usuario solo ingresa **nombre**
- ✅ Obtiene automáticamente **estadísticas del primer resultado**
- ✅ Maneja **múltiples jugadores** en la lista
- ✅ **No expone IDs** al usuario
- ✅ Estados optimizados para UI

**Uso simplificado:**
```javascript
import { usePlayerSearch } from './hooks/usePlayerSearch';

const PlayerFinder = () => {
  const {
    searchAndGetStats,    // Función principal
    searchResults,        // Lista de jugadores
    selectedPlayer,       // Jugador con estadísticas
    isSearching,         // Estado de carga
    error,               // Errores combinados
    hasResults,          // ¿Hay resultados?
    clearSearch          // Limpiar búsqueda
  } = usePlayerSearch();

  const handleSearch = async (name) => {
    await searchAndGetStats(name);
    // Ya tiene estadísticas del primer jugador
  };

  const handleSelectPlayer = async (player) => {
    const playerWithStats = await getPlayerDetails(player);
    // Manejar selección
  };

  return (
    <div>
      <input 
        placeholder="Buscar jugador..." 
        onKeyPress={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
      />
      
      {isSearching && <p>Buscando jugador...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {hasResults && (
        <div>
          <h3>Jugadores encontrados:</h3>
          {searchResults.map((player, index) => (
            <div key={player.id} onClick={() => handleSelectPlayer(player)}>
              <strong>{player.name}</strong>
              <p>{player.team} - {player.position}</p>
              {player.stats && <p>Estadísticas cargadas</p>}
            </div>
          ))}
        </div>
      )}
      
      {selectedPlayer && (
        <div>
          <h2>{selectedPlayer.name}</h2>
          <p>Equipo: {selectedPlayer.team}</p>
          {/* Mostrar estadísticas detalladas */}
        </div>
      )}
    </div>
  );
};
```

**Flujo de uso:**
1. Usuario escribe "Messi" → `searchAndGetStats('Messi')`
2. Hook busca jugadores → obtiene lista con IDs
3. Hook obtiene estadísticas del primer jugador automáticamente
4. UI muestra lista de nombres (sin IDs visibles)
5. Usuario puede seleccionar cualquier jugador para ver sus estadísticas

**Estados y helpers:**
- `searchResults` - Lista de jugadores encontrados
- `selectedPlayer` - Jugador actualmente seleccionado con estadísticas
- `hasResults` - Boolean si hay resultados
- `hasSelectedPlayer` - Boolean si hay jugador seleccionado
- `isFirstPlayerSelected` - Si el primer resultado está seleccionado
- `clearSearch()` - Limpia toda la búsqueda

**¿Por qué este hook es obligatorio?**
- ✅ **Simplifica la experiencia** del usuario
- ✅ **Oculta complejidad técnica** (IDs, múltiples API calls)
- ✅ **Flujo optimizado** de búsqueda + estadísticas
- ✅ **Estados coherentes** para la interfaz
- ✅ **Reutilizable** en diferentes componentes

### ¿Qué hook usar?

**Para desarrollo rápido:** `usePlayerSearch` ⭐
**Para máximo control:** `usePlayers` + `usePlayerStats` por separado
**Para videos:** `useVideos`

**Métodos:**
- `searchVideos(query)` - Busca videos por query
- `clearData()` - Limpia los datos
- `clearError()` - Limpia errores

## Configuración

### Servicio API
El archivo `services/api.js` configura la conexión con el backend:
- **URL base**: `http://localhost:5000/api`
- **Manejo de errores** global
- **Headers** automáticos

### Variables de Entorno
No requiere variables de entorno adicionales para el frontend, ya que se conecta directamente al backend en `localhost:5000`.

## Patrón de Uso

```javascript
// 1. Importar el hook
import { usePlayers } from './hooks';

// 2. Usar en componente
const Component = () => {
  const { 
    searchPlayers, 
    loading, 
    error, 
    data, 
    clearError 
  } = usePlayers();

  // 3. Llamar función async
  const handleSearch = async (searchTerm) => {
    await searchPlayers(searchTerm);
  };

  // 4. Mostrar estados
  return (
    <div>
      {loading && <Spinner />}
      {error && <ErrorMessage message={error} onClose={clearError} />}
      {data && <ResultList data={data} />}
    </div>
  );
};