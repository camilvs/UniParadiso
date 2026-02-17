import { User, Users, PlusCircle, Settings, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';


export function SinglePlayMenu() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-black relative overflow-hidden">
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
        {[...Array(25)].map((_, i) => (
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

      {/* Logout button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 text-pink-300 hover:text-pink-100 font-['VT323'] text-xl transition-colors"
      >
        <LogOut className="w-5 h-5" />
        LOGOUT
      </button>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="mb-12">
          <div className="inline-block mb-6 px-6 py-2 bg-cyan-500/20 border-2 border-cyan-400 rounded-lg animate-pulse">
            <span className="text-cyan-300 font-['VT323'] text-2xl tracking-wider">
              GAME MENU
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-['Press_Start_2P'] text-white mb-6 leading-tight drop-shadow-[0_0_30px_rgba(139,92,246,0.8)]">
            SELECT
            <br />
            MODE
          </h1>
        </div>

        {/* Menu Options */}
        <div className="space-y-6">
          {/* Single Player */}
          <button className="w-full group relative" onClick={() => navigate('/game-play')}>
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 border-4 border-white p-6 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:scale-105">
              <div className="flex items-center justify-center gap-4">
                <User className="w-8 h-8 text-white" />
                <span className="text-white font-['Press_Start_2P'] text-xl">
                  Story Mode
                </span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-full h-full bg-purple-900 border-4 border-purple-900 -z-10"></div>
          </button>

          {/* Multiplayer */}
          <button className="w-full group relative">
            <div className="bg-gradient-to-r from-pink-600 to-pink-800 border-4 border-white p-6 transition-all hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] hover:scale-105">
              <div className="flex items-center justify-center gap-4">
                <Users className="w-8 h-8 text-white" />
                <span className="text-white font-['Press_Start_2P'] text-xl">
                  Create Level
                </span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-full h-full bg-pink-900 border-4 border-pink-900 -z-10"></div>
          </button>

  

          {/* Options */}
          <button className="w-full group relative">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 border-4 border-white p-6 transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.8)] hover:scale-105">
              <div className="flex items-center justify-center gap-4">
                <Settings className="w-8 h-8 text-white" />
                <span className="text-white font-['Press_Start_2P'] text-xl">
                  OPTIONS
                </span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-full h-full bg-indigo-900 border-4 border-indigo-900 -z-10"></div>
          </button>
        </div>

        <div className="mt-12 font-['VT323'] text-purple-300 text-xl">
          READY PLAYER ONE?
        </div>
      </div>
    </div>
  );
}