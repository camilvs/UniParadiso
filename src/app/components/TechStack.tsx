import { Code2, Server, Database, Zap } from 'lucide-react';

export function TechStack() {
  const techLayers = [
    {
      category: 'FRONTEND',
      icon: Code2,
      color: 'from-orange-500 to-red-500',
      borderColor: 'border-orange-400',
      technologies: ['HTML', 'CSS', 'Vanilla JS']
    },
    {
      category: 'BACKEND',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-400',
      technologies: ['Node.js', 'Express.js', 'Socket.io']
    },
    {
      category: 'DATA',
      icon: Database,
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-400',
      technologies: ['SQLite', 'localStorage', 'In-memory']
    },
    {
      category: 'REALTIME',
      icon: Zap,
      color: 'from-yellow-500 to-amber-500',
      borderColor: 'border-yellow-400',
      technologies: ['WebSockets', 'Socket.io', 'Live Updates']
    }
  ];

  const stretchGoals = ['YEAR IN REVIEW', 'ACHIEVEMENTS', 'EYE TRACKING'];

  return (
    <section className="py-20 bg-gradient-to-b from-black via-indigo-950 to-purple-950 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-cyan-500/20 border-2 border-cyan-400">
            <span className="text-cyan-300 font-['VT323'] text-xl">
              TECHNICAL EXCELLENCE
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-['Press_Start_2P'] text-white mb-6 leading-tight">
            TECH STACK
          </h2>
          <p className="text-xl font-['VT323'] text-purple-300 max-w-2xl mx-auto">
            LEAN, MODERN, AND POWERFUL
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {techLayers.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <div
                key={index}
                className={`bg-black/50 ${layer.borderColor} border-4 p-6 backdrop-blur-sm group hover:scale-105 transition-all duration-300`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 mb-4 bg-gradient-to-br ${layer.color} border-2 border-white`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-base font-['Press_Start_2P'] text-white mb-4 leading-relaxed">
                  {layer.category}
                </h3>

                <div className="space-y-2">
                  {layer.technologies.map((tech, i) => (
                    <div
                      key={i}
                      className="text-sm font-['VT323'] text-gray-300 text-lg bg-white/5 px-3 py-1 border border-white/20"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Hosting info */}
        <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-4 border-purple-400 p-8 mb-12 text-center backdrop-blur-sm">
          <h3 className="text-2xl font-['Press_Start_2P'] text-purple-300 mb-4 leading-relaxed">
            DEPLOYMENT
          </h3>
          <p className="text-xl font-['VT323'] text-white">
            HOSTED ON RAILWAY OR RENDER
          </p>
        </div>

        {/* Stretch goals */}
        <div className="bg-black/50 border-4 border-cyan-400 p-8 backdrop-blur-sm relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-cyan-400 px-6 py-2 border-2 border-white">
            <span className="text-sm font-['Press_Start_2P'] text-black">
              BONUS FEATURES
            </span>
          </div>

          <div className="pt-6">
            <h3 className="text-xl font-['Press_Start_2P'] text-cyan-300 mb-6 text-center leading-relaxed">
              STRETCH GOALS
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {stretchGoals.map((goal, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 border-2 border-white transform hover:scale-105 transition-transform cursor-pointer"
                >
                  <span className="font-['Press_Start_2P'] text-white text-sm">
                    {goal}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
