import { Heart, Sparkles, Clock, HardDrive, Baby, Palette } from 'lucide-react';

export function TargetAudience() {
  const audiences = [
    {
      icon: Clock,
      title: 'NOSTALGIA',
      description: '8-bit design that takes veteran players back to gaming\'s golden age',
      stat: '10M+ SOLD',
      examples: 'Stardew Valley, Undertale'
    },
    {
      icon: Palette,
      title: 'INDIE',
      description: 'Join the thriving indie game movement with authentic, creative gameplay',
      stat: 'GROWING',
      examples: 'Player-first design'
    },
    {
      icon: Sparkles,
      title: 'GENRE FANS',
      description: 'Classic pixel graphics meet modern RPG mechanics',
      stat: '10M+ SOLD',
      examples: 'Shovel Knight fans'
    },
    {
      icon: HardDrive,
      title: 'SPACE CONSCIOUS',
      description: 'Low-fi graphics mean smaller file size without sacrificing fun',
      stat: 'LIGHTWEIGHT',
      examples: 'More games, less storage'
    },
    {
      icon: Baby,
      title: 'YOUTH',
      description: 'Colorful pixels and accessible gameplay perfect for younger players',
      stat: 'ALL AGES',
      examples: 'Family friendly'
    },
    {
      icon: Heart,
      title: 'COMMUNITY',
      description: 'Players seeking genuine connection and creative expression',
      stat: 'TOGETHER',
      examples: 'Build & share'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-950 via-purple-950 to-black relative overflow-hidden">
      {/* Animated pixel rain effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 bg-cyan-400 animate-fall"
            style={{
              left: `${(i * 3.33)}%`,
              height: `${Math.random() * 50 + 20}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-['Press_Start_2P'] text-white mb-6 leading-tight">
            FOR EVERY
            <br />
            PLAYER
          </h2>
          <p className="text-xl font-['VT323'] text-pink-300 max-w-2xl mx-auto">
            DESIGNED WITH DIVERSE GAMERS IN MIND
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={index}
                className="bg-black/50 border-4 border-purple-400 p-6 backdrop-blur-sm relative group hover:border-cyan-400 transition-all duration-300"
              >
                {/* Stat badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-br from-pink-500 to-purple-600 px-3 py-1 border-2 border-white">
                  <span className="text-xs font-['Press_Start_2P'] text-white">
                    {audience.stat}
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center border-2 border-white">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-['Press_Start_2P'] text-white leading-relaxed pt-2">
                    {audience.title}
                  </h3>
                </div>

                <p className="text-base font-['VT323'] text-purple-200 mb-3 leading-relaxed">
                  {audience.description}
                </p>

                <div className="pt-3 border-t-2 border-purple-600">
                  <p className="text-sm font-['VT323'] text-cyan-300">
                    {audience.examples}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-purple-600/0 group-hover:from-cyan-400/10 group-hover:to-purple-600/10 transition-all duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
