import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { usePlayerSearch } from '../hooks/usePlayerSearch';
import { Search, User, MapPin, Calendar, Loader2 } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);

  const {
    searchResults,
    isSearching,
    error,
    searchAndGetStats
  } = usePlayerSearch();

  useEffect(() => {
    if (query) {
      searchAndGetStats(query);
    }
  }, [query, searchAndGetStats]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchInput)}`;
    }
  };

  return (
    <div className="min-h-screen bg-primary text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6 font-geist">Buscar Jugadores</h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Buscar jugador..."
                className="w-full px-6 py-3 text-lg bg-white/10 border border-border-card rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-accent-blue hover:bg-blue-700 text-white p-2 rounded transition-colors"
                disabled={isSearching}
              >
                {isSearching ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isSearching && (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={48} className="animate-spin text-accent-blue" />
            <span className="ml-4 text-xl">Buscando jugadores...</span>
          </div>
        )}

        {/* Results Grid */}
        {!isSearching && searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((player, index) => (
              <Link
                key={player.id || index}
                to={`/player/${player.id}`}
                className="bg-white/5 border border-border-card rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center mb-4">
                  {player.photo ? (
                    <img
                      src={player.photo}
                      alt={player.name}
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mr-4">
                      <User size={24} className="text-accent-blue" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-accent-blue transition-colors">
                      {player.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{player.team}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-2 text-accent-pink" />
                    <span>{player.nationality}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-2 text-accent-purple" />
                    <span>{player.age} años</span>
                  </div>
                  <div className="flex items-center">
                    <User size={14} className="mr-2 text-accent-blue" />
                    <span>{player.position}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isSearching && searchResults.length === 0 && query && !error && (
          <div className="text-center py-16">
            <Search size={64} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">No se encontraron resultados</h3>
            <p className="text-gray-400">Intenta con otro nombre de jugador</p>
          </div>
        )}

        {/* Initial State */}
        {!query && (
          <div className="text-center py-16">
            <Search size={64} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Busca un jugador</h3>
            <p className="text-gray-400">Ingresa el nombre de un jugador para comenzar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;