import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BarChart3, Play, Brain } from 'lucide-react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  const features = [
    {
      icon: BarChart3,
      title: 'Estadísticas',
      description: 'Accede a estadísticas detalladas de jugadores profesionales',
      color: 'accent-blue'
    },
    {
      icon: Play,
      title: 'Multimedia',
      description: 'Imagenes destacadas y goles de partidos',
      color: 'accent-pink'
    },
    {
      icon: Brain,
      title: 'Búsqueda Inteligente',
      description: 'Encuentra jugadores con IA avanzada',
      color: 'accent-purple'
    }
  ];

  return (
    <div className="min-h-screen bg-primary text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-geist">
            Encuentra tu
            <span className="text-accent-blue"> Jugador</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Descubre estadísticas,  y análisis de jugadores profesionales con tecnología de IA
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar jugador..."
                className="w-full px-6 py-4 text-lg bg-white/10 border border-border-card rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent backdrop-blur-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-accent-blue hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
              >
                <Search size={24} />
              </button>
            </div>
          </form>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/5 border border-border-card rounded-xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className={`inline-flex p-4 rounded-lg bg-${feature.color}/20 mb-6 group-hover:bg-${feature.color}/30 transition-colors`}>
                  <IconComponent size={32} className={`text-${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-geist">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;