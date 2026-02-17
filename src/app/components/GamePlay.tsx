import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// interface GamePlayProps {
//   onBack: () => void;
// }

export function GamePlay(/*{ onBack }: GamePlayProps*/) {
  const navigate = useNavigate();
  
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [playerPos, setPlayerPos] = useState({ x: 200, y: 200 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simple pixel game rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 640;
    canvas.height = 480;

    // Clear canvas
    ctx.fillStyle = '#87CEEB'; // Sky blue
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grass
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, 400, canvas.width, 80);

    // Draw some mountains (triangles)
    ctx.fillStyle = '#301e07ff';
    ctx.beginPath();
    ctx.moveTo(100, 400);
    ctx.lineTo(200, 250);
    ctx.lineTo(300, 400);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(250, 400);
    ctx.lineTo(350, 200);
    ctx.lineTo(450, 400);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(400, 400);
    ctx.lineTo(500, 280);
    ctx.lineTo(600, 400);
    ctx.fill();

    // Draw sun
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(80, 80, 30, 0, Math.PI * 2);
    ctx.fill();

    // Draw clouds
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 3; i++) {
      const x = 150 + i * 200;
      const y = 100 + i * 30;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.arc(x + 20, y, 25, 0, Math.PI * 2);
      ctx.arc(x + 40, y, 20, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw pixel character (8-bit style)
    const drawPixelChar = (x: number, y: number) => {
      const pixelSize = 8;
      
      // Character colors
      const skinColor = '#FFD1A4';
      const shirtColor = '#FF6B6B';
      const pantsColor = '#4ECDC4';
      
      // Head
      ctx.fillStyle = skinColor;
      ctx.fillRect(x, y, pixelSize * 2, pixelSize * 2);
      
      // Body
      ctx.fillStyle = shirtColor;
      ctx.fillRect(x, y + pixelSize * 2, pixelSize * 2, pixelSize * 2);
      
      // Legs
      ctx.fillStyle = pantsColor;
      ctx.fillRect(x, y + pixelSize * 4, pixelSize, pixelSize * 2);
      ctx.fillRect(x + pixelSize, y + pixelSize * 4, pixelSize, pixelSize * 2);
    };

    drawPixelChar(playerPos.x, playerPos.y);

    // Draw some trees
    const drawTree = (x: number, y: number) => {
      // Trunk
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(x, y, 16, 32);
      
      // Foliage
      ctx.fillStyle = '#228B22';
      ctx.fillRect(x - 16, y - 24, 48, 24);
      ctx.fillRect(x - 8, y - 40, 32, 16);
    };

    drawTree(500, 350);
    drawTree(150, 370);

  }, [playerPos]);

  // Movement handler
  useEffect(() => {
    if (activeButton === 'up') {
      setPlayerPos(prev => ({ ...prev, y: Math.max(0, prev.y - 4) }));
    }
    if (activeButton === 'down') {
      setPlayerPos(prev => ({ ...prev, y: Math.min(440, prev.y + 4) }));
    }
    if (activeButton === 'left') {
      setPlayerPos(prev => ({ ...prev, x: Math.max(0, prev.x - 4) }));
    }
    if (activeButton === 'right') {
      setPlayerPos(prev => ({ ...prev, x: Math.min(620, prev.x + 4) }));
    }
  }, [activeButton]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowleft', 'arrowdown', 'arrowright'].includes(key)) {
        e.preventDefault();
        if (key === 'w' || key === 'arrowup') setActiveButton('up');
        if (key === 'a' || key === 'arrowleft') setActiveButton('left');
        if (key === 's' || key === 'arrowdown') setActiveButton('down');
        if (key === 'd' || key === 'arrowright') setActiveButton('right');
      }
      if (key === 'escape' || key === 'enter' || key === ' ') {
        e.preventDefault();
        setShowMenu(!showMenu);
      }
    };

    const handleKeyUp = () => {
      setActiveButton(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [showMenu]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black flex items-center justify-center p-4">
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

      <div className="relative max-w-5xl w-full z-10">
        {/* Game Console */}
        <div className="relative bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 border-8 border-purple-800 rounded-3xl overflow-hidden shadow-2xl p-6 shadow-[0_0_50px_rgba(139,92,246,0.5)]">
          
          {/* Screen Area */}
          <div className="bg-gradient-to-b from-indigo-900 to-black rounded-lg p-4 mb-6 border-4 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
            <canvas 
              ref={canvasRef}
              className="w-full h-auto bg-black rounded border-2 border-cyan-500"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          {/* GAME GAL Label */}
          <div className="text-center mb-4">
            <h2 className="text-white font-['Press_Start_2P'] text-xl md:text-2xl tracking-wider drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
              GAME GAL
            </h2>
          </div>

          {/* Controller Section */}
          <div className="bg-gradient-to-b from-cyan-400 to-cyan-500 rounded-2xl p-6 border-4 border-cyan-600 shadow-inner">
            <div className="flex items-center justify-center gap-16">
              
              {/* Left Section - D-Pad */}
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  {/* Up */}
                  <button
                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded transition-all shadow-lg border-2 border-indigo-700 ${
                      activeButton === 'up' ? 'bg-indigo-700 scale-95 shadow-[0_0_10px_rgba(99,102,241,0.8)]' : ''
                    }`}
                    onMouseDown={() => setActiveButton('up')}
                    onMouseUp={() => setActiveButton(null)}
                    onMouseLeave={() => setActiveButton(null)}
                    onTouchStart={() => setActiveButton('up')}
                    onTouchEnd={() => setActiveButton(null)}
                  >
                    ▲
                  </button>
                  
                  {/* Left */}
                  <button
                    className={`absolute top-1/2 left-0 -translate-y-1/2 w-10 h-10 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded transition-all shadow-lg border-2 border-indigo-700 ${
                      activeButton === 'left' ? 'bg-indigo-700 scale-95 shadow-[0_0_10px_rgba(99,102,241,0.8)]' : ''
                    }`}
                    onMouseDown={() => setActiveButton('left')}
                    onMouseUp={() => setActiveButton(null)}
                    onMouseLeave={() => setActiveButton(null)}
                    onTouchStart={() => setActiveButton('left')}
                    onTouchEnd={() => setActiveButton(null)}
                  >
                    ◄
                  </button>
                  
                  {/* Center Circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full border-2 border-purple-600"></div>
                  
                  {/* Right */}
                  <button
                    className={`absolute top-1/2 right-0 -translate-y-1/2 w-10 h-10 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded transition-all shadow-lg border-2 border-indigo-700 ${
                      activeButton === 'right' ? 'bg-indigo-700 scale-95 shadow-[0_0_10px_rgba(99,102,241,0.8)]' : ''
                    }`}
                    onMouseDown={() => setActiveButton('right')}
                    onMouseUp={() => setActiveButton(null)}
                    onMouseLeave={() => setActiveButton(null)}
                    onTouchStart={() => setActiveButton('right')}
                    onTouchEnd={() => setActiveButton(null)}
                  >
                    ►
                  </button>
                  
                  {/* Down */}
                  <button
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded transition-all shadow-lg border-2 border-indigo-700 ${
                      activeButton === 'down' ? 'bg-indigo-700 scale-95 shadow-[0_0_10px_rgba(99,102,241,0.8)]' : ''
                    }`}
                    onMouseDown={() => setActiveButton('down')}
                    onMouseUp={() => setActiveButton(null)}
                    onMouseLeave={() => setActiveButton(null)}
                    onTouchStart={() => setActiveButton('down')}
                    onTouchEnd={() => setActiveButton(null)}
                  >
                    ▼
                  </button>
                </div>
              </div>

              {/* Right Section - Start Button */}
              <div className="flex flex-col items-center gap-3">
                <button
                  className="bg-purple-600 hover:bg-purple-500 text-white font-['Press_Start_2P'] text-sm px-8 py-3 rounded-full border-4 border-purple-800 transition-all hover:scale-105 shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:shadow-[0_0_25px_rgba(139,92,246,0.9)]"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  START
                </button>
                
                {/* Speaker holes decoration */}
                <div className="flex gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-indigo-900 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Brand/Model Text */}
          <div className="text-center mt-4">
            <p className="text-white font-['VT323'] text-lg drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
              UNI PARADISO EDITION
            </p>
          </div>
        </div>

        {/* Instruction Text */}
        <div className="mt-6 text-center">
          <p className="text-cyan-400 font-['VT323'] text-xl">
            Use WASD or Arrow Keys to Move • ENTER/SPACE for Menu
          </p>
        </div>

        {/* Menu Overlay */}
        {showMenu && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gradient-to-b from-purple-900 to-indigo-900 border-8 border-purple-400 rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-white font-['Press_Start_2P'] text-2xl text-center mb-8">
                PAUSED
              </h2>
              
              <div className="space-y-4">
                <button
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-['Press_Start_2P'] text-lg py-4 px-6 border-4 border-white transition-all hover:scale-105"
                  onClick={() => setShowMenu(false)}
                >
                  RESUME
                </button>
                
                <button
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-['Press_Start_2P'] text-lg py-4 px-6 border-4 border-white transition-all hover:scale-105"
                >
                  SETTINGS
                </button>
                
                <button
                  className="w-full bg-pink-600 hover:bg-pink-500 text-white font-['Press_Start_2P'] text-lg py-4 px-6 border-4 border-white transition-all hover:scale-105"
                  onClick={() => navigate('/game-menu')}
                >
                  EXIT TO MENU
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}