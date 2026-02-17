import { useState } from 'react';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

// interface AuthPageProps {
//   onBack: () => void;
//   onLoginSuccess: () => void;
// }

export function AuthPage(/*{ onBack, onLoginSuccess }: AuthPageProps*/) {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log(isLogin ? 'Logging in...' : 'Signing up...');
    // Simulate successful login/signup and navigate to game menu
    navigate('/game-menu');
  };

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

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-cyan-300 hover:text-cyan-100 font-['VT323'] text-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          BACK TO START
        </button>

        {/* Auth Container */}
        <div className="bg-black/70 border-4 border-purple-500 p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-['Press_Start_2P'] text-white mb-4 leading-tight">
              {isLogin ? 'LOGIN' : 'SIGN UP'}
            </h1>
            <p className="text-lg font-['VT323'] text-cyan-300">
              {isLogin ? 'WELCOME BACK, PLAYER!' : 'CREATE YOUR ACCOUNT'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-purple-300 font-['VT323'] text-xl mb-2">
                  USERNAME
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-black/50 border-2 border-cyan-400 text-white font-['VT323'] text-xl px-12 py-3 focus:outline-none focus:border-pink-400 focus:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all"
                    placeholder="ENTER USERNAME"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-purple-300 font-['VT323'] text-xl mb-2">
                EMAIL
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border-2 border-cyan-400 text-white font-['VT323'] text-xl px-12 py-3 focus:outline-none focus:border-pink-400 focus:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all"
                  placeholder="ENTER EMAIL"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-purple-300 font-['VT323'] text-xl mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border-2 border-cyan-400 text-white font-['VT323'] text-xl px-12 py-3 focus:outline-none focus:border-pink-400 focus:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all"
                  placeholder="ENTER PASSWORD"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-['Press_Start_2P'] text-sm px-8 py-6 border-4 border-white shadow-[0_8px_0_rgba(0,0,0,0.3)] hover:shadow-[0_4px_0_rgba(0,0,0,0.3)] hover:translate-y-1 transition-all"
            >
              {isLogin ? 'LOGIN' : 'SIGN UP'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyan-300 hover:text-cyan-100 font-['VT323'] text-xl underline transition-colors"
            >
              {isLogin ? 'NEED AN ACCOUNT? SIGN UP' : 'ALREADY HAVE AN ACCOUNT? LOGIN'}
            </button>
          </div>

          {/* Decorative stats */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-black/50 border-2 border-purple-500 p-4 text-center">
              <div className="text-2xl font-['Press_Start_2P'] text-pink-400 mb-1">
                1000+
              </div>
              <div className="text-sm font-['VT323'] text-purple-300 text-lg">
                PLAYERS
              </div>
            </div>
            <div className="bg-black/50 border-2 border-purple-500 p-4 text-center">
              <div className="text-2xl font-['Press_Start_2P'] text-cyan-400 mb-1">
                ZERO
              </div>
              <div className="text-sm font-['VT323'] text-purple-300 text-lg">
                PAY TO WIN
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}