import { Gamepad2, Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
// interface HeroProps {
//   onBackToCover: () => void;
// }

export function Hero(/*{ onBackToCover }: HeroProps*/) {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-purple-900 via-indigo-900 to-black">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating pixels decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 opacity-60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-cyan-300 hover:text-cyan-100 font-['VT323'] text-xl transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        BACK TO START
      </button>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-block mb-6 px-6 py-2 bg-cyan-500/20 border-2 border-cyan-400 rounded-lg animate-pulse">
          <span className="text-cyan-300 font-['VT323'] text-2xl tracking-wider">
            PLAYER ONE READY
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-['Press_Start_2P'] text-white mb-8 leading-tight drop-shadow-[0_0_30px_rgba(139,92,246,0.8)]">
          UNI
          <br />
          PARADISO
        </h1>

        <p className="text-xl md:text-2xl font-['VT323'] text-cyan-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          BREAK FREE FROM CORPORATE BLOAT. EXPERIENCE GAMING AS IT WAS MEANT TO BE:
          CREATIVE, FAIR, AND PLAYER-FIRST.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            onClick={() => navigate('/game-play')}
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-['Press_Start_2P'] text-sm px-8 py-6 border-4 border-white shadow-[0_8px_0_rgba(0,0,0,0.3)] hover:shadow-[0_4px_0_rgba(0,0,0,0.3)] hover:translate-y-1 transition-all"
          >
            <Gamepad2 className="mr-3 h-5 w-5" />
            PLAY NOW
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="bg-transparent border-4 border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black font-['Press_Start_2P'] text-sm px-8 py-6 shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all"
          >
            <Sparkles className="mr-3 h-5 w-5" />
            LEARN MORE
          </Button>
        </div>

        {/* Pixel art style stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { label: 'NO PAY-TO-WIN', value: '100%' },
            { label: 'PLAYER OWNED', value: 'ASSETS' },
            { label: 'INFINITE', value: 'LEVELS' }
          ].map((stat, i) => (
            <div 
              key={i}
              className="bg-black/50 border-4 border-purple-500 p-6 backdrop-blur-sm transform hover:scale-105 transition-transform"
            >
              <div className="text-3xl font-['Press_Start_2P'] text-pink-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-['VT323'] text-purple-300 text-xl">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}