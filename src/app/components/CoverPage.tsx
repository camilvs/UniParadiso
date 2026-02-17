import { Gamepad2 } from 'lucide-react';
import { Button } from "./ui/button";
import { useNavigate } from 'react-router-dom';

// interface CoverPageProps {
//   onPlay: () => void;
//   onAboutUs: () => void;
// }

export function CoverPage(/*{ onPlay, onAboutUs }: CoverPageProps*/) {
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
        {[...Array(30)].map((_, i) => (
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

      <div className="relative z-10 text-center px-6">
        <div className="mb-12">
          <h1 className="text-8xl md:text-9xl font-['Press_Start_2P'] text-white mb-4 leading-tight drop-shadow-[0_0_40px_rgba(139,92,246,1)] animate-pulse">
            UNI
            <br />
            PARADISO
          </h1>
          <p className="text-2xl font-['VT323'] text-cyan-300 tracking-wider">
            PRESS START TO BEGIN YOUR ADVENTURE
          </p>
        </div>

        <Button
          onClick={() => navigate('/auth')}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-['Press_Start_2P'] text-lg px-12 py-8 border-4 border-white shadow-[0_8px_0_rgba(0,0,0,0.3)] hover:shadow-[0_4px_0_rgba(0,0,0,0.3)] hover:translate-y-1 transition-all animate-pulse"
        >
          <Gamepad2 className="mr-4 h-6 w-6" />
          PLAY
        </Button>

        <div className="mt-6">
          <button
            onClick={() => navigate('/landing')}
            className="text-cyan-300 hover:text-cyan-100 font-['VT323'] text-2xl underline transition-colors"
          >
            ABOUT US
          </button>
        </div>

        <div className="mt-12 font-['VT323'] text-purple-300 text-xl">
          © 2026 UNI PARADISO - PLAYER FIRST GAMING
        </div>
      </div>
    </div>
  );
}