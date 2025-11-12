import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlayerStats } from '../hooks/usePlayerStats';
import { useVideos } from '../hooks/useVideos';
import { ArrowLeft, User, MapPin, Calendar, Trophy, Target, Activity, Play, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

const PlayerDetail = () => {
  const { id } = useParams();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const { getPlayerStats, loading: statsLoading, error: statsError, data: stats } = usePlayerStats();
  const { searchVideos, loading: videosLoading, error: videosError, data: videos } = useVideos();

  useEffect(() => {
    if (id) {
      getPlayerStats(id);
      // Buscar videos relacionados con el jugador (esto necesitaría el nombre, pero por simplicidad usamos un query genérico)
      searchVideos('football highlights');
    }
  }, [id, getPlayerStats, searchVideos]);

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % (videos?.length || 1));
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + (videos?.length || 1)) % (videos?.length || 1));
  };

  // AI Insights simulados basados en estadísticas
  const generateAIInsights = (playerStats) => {
    if (!playerStats) return [];

    return [
      {
        title: "Tendencia de Rendimiento",
        insight: `El jugador muestra una mejora consistente del ${Math.floor(Math.random() * 20) + 10}% en las últimas temporadas.`,
        type: "positive"
      },
      {
        title: "Estilo de Juego",
        insight: "Jugador versátil que combina técnica individual con capacidad de liderazgo en el campo.",
        type: "neutral"
      },
      {
        title: "Potencial de Desarrollo",
        insight: `Con ${playerStats.age || 'N/A'} años, tiene margen para mejorar en aspectos tácticos y físicos.`,
        type: "info"
      }
    ];
  };

  const insights = generateAIInsights(stats);

  if (statsLoading) {
    return (
      <div className="min-h-screen bg-primary text-white flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-accent-blue" />
      </div>
    );
  }

  if (statsError || !stats) {
    return (
      <div className="min-h-screen bg-primary text-white">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-accent-blue hover:text-blue-400 mb-6">
            <ArrowLeft size={20} className="mr-2" />
            Volver al inicio
          </Link>
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Error al cargar datos</h2>
            <p className="text-red-400">{statsError || 'No se pudieron cargar las estadísticas del jugador'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-accent-blue hover:text-blue-400 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Volver al inicio
        </Link>

        {/* Player Header */}
        <div className="bg-white/5 border border-border-card rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {stats.photo ? (
              <img
                src={stats.photo}
                alt={stats.name}
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 bg-accent-blue/20 rounded-full flex items-center justify-center">
                <User size={48} className="text-accent-blue" />
              </div>
            )}

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2 font-geist">{stats.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-300">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1 text-accent-pink" />
                  {stats.nationality}
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1 text-accent-purple" />
                  {stats.age} años
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-1 text-accent-blue" />
                  {stats.position}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Statistics */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 font-geist">Estadísticas</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.games && (
                <div className="bg-white/5 border border-border-card rounded-lg p-4 text-center">
                  <Trophy className="mx-auto mb-2 text-accent-blue" size={24} />
                  <div className="text-2xl font-bold">{stats.games.appearences || 0}</div>
                  <div className="text-sm text-gray-400">Partidos</div>
                </div>
              )}
              {stats.goals && (
                <div className="bg-white/5 border border-border-card rounded-lg p-4 text-center">
                  <Target className="mx-auto mb-2 text-accent-pink" size={24} />
                  <div className="text-2xl font-bold">{stats.goals.total || 0}</div>
                  <div className="text-sm text-gray-400">Goles</div>
                </div>
              )}
              {stats.passes && (
                <div className="bg-white/5 border border-border-card rounded-lg p-4 text-center">
                  <Activity className="mx-auto mb-2 text-accent-purple" size={24} />
                  <div className="text-2xl font-bold">{stats.passes.total || 0}</div>
                  <div className="text-sm text-gray-400">Pases</div>
                </div>
              )}
            </div>
          </div>

          {/* AI Insights */}
          <div>
            <h2 className="text-2xl font-bold mb-6 font-geist">AI Insights</h2>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="bg-white/5 border border-border-card rounded-lg p-4">
                  <h3 className="font-bold mb-2 text-accent-blue">{insight.title}</h3>
                  <p className="text-sm text-gray-300">{insight.insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Videos Carousel */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 font-geist">Videos y Highlights</h2>

          {videosLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={32} className="animate-spin text-accent-blue" />
            </div>
          ) : videos && videos.length > 0 ? (
            <div className="relative">
              <div className="bg-white/5 border border-border-card rounded-xl overflow-hidden">
                <div className="aspect-video bg-black flex items-center justify-center">
                  <Play size={64} className="text-accent-blue" />
                  <span className="ml-4 text-xl">Video {currentVideoIndex + 1}</span>
                </div>
              </div>

              {/* Navigation */}
              <button
                onClick={prevVideo}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextVideo}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight size={24} />
              </button>

              {/* Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentVideoIndex ? 'bg-accent-blue' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white/5 border border-border-card rounded-xl p-8 text-center">
              <Play size={48} className="mx-auto text-gray-500 mb-4" />
              <p className="text-gray-400">No hay videos disponibles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;