import { useState, useEffect } from 'react';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { useAuth } from '../../context/authContext';

export function SignupPage() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (userLoggedIn) navigate('/game-menu');
  }, [userLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await doCreateUserWithEmailAndPassword(email, password);
      navigate('/game-menu');
    } catch (err: any) {
      setError(err.message || 'Signup Failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-black relative overflow-hidden">
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2 text-cyan-300 hover:text-cyan-100 font-['VT323'] text-xl transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        BACK TO START
      </button>

      <div className="bg-black/70 border-4 border-purple-500 p-8 backdrop-blur-sm w-full max-w-md">
        <h1 className="text-4xl font-['Press_Start_2P'] text-white mb-4 text-center">
          SIGN UP
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-purple-300 font-['VT323'] text-xl mb-2">
              USERNAME
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border-2 border-cyan-400 text-white font-['VT323'] text-xl px-12 py-3"
                placeholder="ENTER USERNAME"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-purple-300 font-['VT323'] text-xl mb-2">
              EMAIL
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border-2 border-cyan-400 text-white font-['VT323'] text-xl px-12 py-3"
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
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border-2 border-cyan-400 text-white font-['VT323'] text-xl px-12 py-3"
                placeholder="ENTER PASSWORD"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-['Press_Start_2P'] text-sm px-8 py-6 border-4 border-white"
          >
            SIGN UP
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-cyan-300 underline font-['VT323'] text-xl"
          >
            ALREADY HAVE AN ACCOUNT? LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}