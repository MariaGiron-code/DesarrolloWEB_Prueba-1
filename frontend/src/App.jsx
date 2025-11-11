import { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [testResults, setTestResults] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [videoQuery, setVideoQuery] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  // Test backend connection on mount
  useEffect(() => {
    testBackendConnection();
  }, []);

  const testBackendConnection = async () => {
    try {
      setBackendStatus('testing');
      const response = await api.get('/players/search?name=messi');
      if (response.data) {
        setBackendStatus('connected');
        setTestResults(prev => ({ ...prev, connection: { success: true, data: response.data } }));
      }
    } catch (error) {
      setBackendStatus('error');
      setErrors(prev => ({ 
        ...prev, 
        connection: error.message || 'Backend no disponible' 
      }));
    }
  };

  const testPlayerSearch = async () => {
    if (!searchTerm.trim()) {
      setErrors(prev => ({ ...prev, search: 'Ingresa un nombre de jugador' }));
      return;
    }
    
    setLoading(prev => ({ ...prev, search: true }));
    setErrors(prev => ({ ...prev, search: null }));
    
    try {
      const response = await api.get(`/players/search?name=${encodeURIComponent(searchTerm)}`);
      setTestResults(prev => ({ 
        ...prev, 
        search: { success: true, data: response.data, query: searchTerm } 
      }));
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        search: error.response?.data?.error || error.message 
      }));
    } finally {
      setLoading(prev => ({ ...prev, search: false }));
    }
  };

  const testPlayerStats = async () => {
    if (!playerId.trim()) {
      setErrors(prev => ({ ...prev, stats: 'Ingresa un ID de jugador' }));
      return;
    }
    
    setLoading(prev => ({ ...prev, stats: true }));
    setErrors(prev => ({ ...prev, stats: null }));
    
    try {
      const response = await api.get(`/players/${playerId}/stats`);
      setTestResults(prev => ({ 
        ...prev, 
        stats: { success: true, data: response.data, playerId } 
      }));
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        stats: error.response?.data?.error || error.message 
      }));
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  };

  const testVideoSearch = async () => {
    if (!videoQuery.trim()) {
      setErrors(prev => ({ ...prev, videos: 'Ingresa una consulta de video' }));
      return;
    }
    
    setLoading(prev => ({ ...prev, videos: true }));
    setErrors(prev => ({ ...prev, videos: null }));
    
    try {
      const response = await api.get(`/videos/search?query=${encodeURIComponent(videoQuery)}`);
      setTestResults(prev => ({ 
        ...prev, 
        videos: { success: true, data: response.data, query: videoQuery } 
      }));
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        videos: error.response?.data?.error || error.message 
      }));
    } finally {
      setLoading(prev => ({ ...prev, videos: false }));
    }
  };

  const clearResults = () => {
    setTestResults({});
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🔧 FootballSearch - Interfaz de Pruebas
          </h1>
          <p className="text-gray-300 text-lg">
            Herramienta para probar la conectividad y funcionalidades del backend
          </p>
        </div>

        {/* Status Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Estado del Sistema</h2>
            <button
              onClick={testBackendConnection}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Probar Conexión
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`w-3 h-3 rounded-full ${
              backendStatus === 'connected' ? 'bg-green-500 animate-pulse' :
              backendStatus === 'error' ? 'bg-red-500' :
              'bg-yellow-500 animate-pulse'
            }`}></div>
            <span className="text-white">
              {backendStatus === 'connected' ? '✅ Backend Conectado' :
               backendStatus === 'error' ? '❌ Error de Conexión' :
               backendStatus === 'checking' ? '⏳ Verificando...' : '🧪 Probando...'}
            </span>
          </div>
        </div>

        {/* Test Controls */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Player Search Test */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">🔍 Búsqueda de Jugadores</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nombre del jugador (ej: Messi, Ronaldo)"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={testPlayerSearch}
                disabled={loading.search}
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {loading.search ? '⏳ Buscando...' : '🔍 Buscar Jugadores'}
              </button>
              {errors.search && (
                <p className="text-red-400 text-sm">❌ {errors.search}</p>
              )}
            </div>
          </div>

          {/* Player Stats Test */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">📊 Estadísticas de Jugador</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                placeholder="ID del jugador (ej: 33, 40)"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={testPlayerStats}
                disabled={loading.stats}
                className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                {loading.stats ? '⏳ Cargando...' : '📊 Ver Estadísticas'}
              </button>
              {errors.stats && (
                <p className="text-red-400 text-sm">❌ {errors.stats}</p>
              )}
            </div>
          </div>

          {/* Video Search Test */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">🎥 Búsqueda de Videos</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={videoQuery}
                onChange={(e) => setVideoQuery(e.target.value)}
                placeholder="Consulta de video (ej: Messi goals)"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={testVideoSearch}
                disabled={loading.videos}
                className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {loading.videos ? '⏳ Buscando...' : '🎥 Buscar Videos'}
              </button>
              {errors.videos && (
                <p className="text-red-400 text-sm">❌ {errors.videos}</p>
              )}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        {Object.keys(testResults).length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">📋 Resultados de Pruebas</h2>
              <button
                onClick={clearResults}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                🗑️ Limpiar Resultados
              </button>
            </div>

            <div className="space-y-6">
              {Object.entries(testResults).map(([key, result]) => (
                <div key={key} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <h3 className="text-white font-semibold capitalize">
                      {key === 'connection' ? 'Conexión al Backend' :
                       key === 'search' ? `Búsqueda: "${result.query}"` :
                       key === 'stats' ? `Estadísticas: Jugador ${result.playerId}` :
                       key === 'videos' ? `Videos: "${result.query}"` : key}
                    </h3>
                  </div>
                  
                  <div className="bg-gray-800 rounded p-3 max-h-96 overflow-auto">
                    <pre className="text-green-400 text-sm">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Test Buttons */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">🚀 Pruebas Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => setSearchTerm('Messi')}
              className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
            >
              Probar "Messi"
            </button>
            <button
              onClick={() => setPlayerId('33')}
              className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
            >
              Probar ID "33"
            </button>
            <button
              onClick={() => setVideoQuery('Messi goals')}
              className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
            >
              Videos "Messi"
            </button>
            <button
              onClick={() => {
                setSearchTerm('Ronaldo');
                setPlayerId('40');
                setVideoQuery('Cristiano skills');
              }}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
            >
              Configurar "Ronaldo"
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
