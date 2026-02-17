import { X, Check } from 'lucide-react';

export function ProblemSolution() {
  const comparisons = [
    {
      problem: 'Predatory Gambling/Loot Boxes',
      solution: 'Skill-based crafting and direct trading'
    },
    {
      problem: 'Formulaic, repetitive levels',
      solution: 'Infinite variety via user generated content'
    },
    {
      problem: '"Dead-end" digital assets',
      solution: 'A circular economy where items have trade value'
    },
    {
      problem: 'Corporate bloat/dark patterns',
      solution: 'A lean, player-first creative sandbox'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black via-indigo-950 to-purple-950 relative overflow-hidden">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0px, transparent 1px, transparent 2px, rgba(255,255,255,0.1) 3px)',
          backgroundSize: '100% 4px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-['Press_Start_2P'] text-white mb-6 leading-tight">
            THE PARADIGM
            <br />
            SHIFT
          </h2>
          <p className="text-xl font-['VT323'] text-purple-300 max-w-2xl mx-auto">
            FROM EXPLOITATION TO EMPOWERMENT
          </p>
        </div>

        <div className="space-y-8">
          {comparisons.map((item, index) => (
            <div
              key={index}
              className="grid md:grid-cols-2 gap-6 items-stretch"
            >
              {/* Problem */}
              <div className="bg-red-950/30 border-4 border-red-600 p-6 backdrop-blur-sm relative group hover:scale-105 transition-transform">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-red-600 flex items-center justify-center">
                  <X className="h-5 w-5 text-white" />
                </div>
                <div className="text-xs font-['Press_Start_2P'] text-red-400 mb-3">
                  THE PROBLEM
                </div>
                <p className="text-lg font-['VT323'] text-red-200 leading-relaxed">
                  {item.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="bg-green-950/30 border-4 border-green-500 p-6 backdrop-blur-sm relative group hover:scale-105 transition-transform">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-500 flex items-center justify-center">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div className="text-xs font-['Press_Start_2P'] text-green-400 mb-3">
                  OUR SOLUTION
                </div>
                <p className="text-lg font-['VT323'] text-green-200 leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual separator */}
        <div className="mt-16 flex items-center justify-center">
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
