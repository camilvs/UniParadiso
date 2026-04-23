import { Users, ShoppingBag, Gamepad, BookOpen } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: BookOpen,
      title: 'ACCESSIBILITY',
      description: 'See sound feature, subtitles, and font sizing to ensure everyone can play',
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-400',
      bgColor: 'bg-blue-950/30'
    },
    {
      icon: ShoppingBag,
      title: 'PLAYER ECONOMY',
      description: 'Create, trade, sell items with other players. Send gifts and build a real economy',
      color: 'from-yellow-500 to-orange-500',
      borderColor: 'border-yellow-400',
      bgColor: 'bg-yellow-950/30'
    },
    {
      icon: Users,
      title: 'MULTIPLAYER',
      description: 'Play levels with friends, share loot, explore user-created content together',
      color: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-400',
      bgColor: 'bg-green-950/30'
    },
    {
      icon: Gamepad,
      title: 'DIGITAL GAME MENU',
      description: 'Complete booklet with character descriptions, controls, instructions & story',
      color: 'from-pink-500 to-purple-500',
      borderColor: 'border-pink-400',
      bgColor: 'bg-pink-950/30'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-purple-950 via-black to-indigo-950 relative">
      {/* Decorative corner brackets */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-4 border-l-4 border-cyan-400 opacity-50"></div>
      <div className="absolute top-10 right-10 w-20 h-20 border-t-4 border-r-4 border-cyan-400 opacity-50"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b-4 border-l-4 border-cyan-400 opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-4 border-r-4 border-cyan-400 opacity-50"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-purple-500/20 border-2 border-purple-400">
            <span className="text-purple-300 font-['VT323'] text-xl">
              CORE SYSTEMS
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-['Press_Start_2P'] text-white mb-6 leading-tight">
            FEATURES
          </h2>
          <p className="text-xl font-['VT323'] text-cyan-300 max-w-2xl mx-auto">
            BUILT FOR PLAYERS, NOT PROFITS
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`${feature.bgColor} ${feature.borderColor} border-4 p-8 backdrop-blur-sm relative group hover:scale-105 transition-all duration-300 cursor-pointer`}
              >
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 bg-white"></div>
                <div className="absolute top-0 right-0 w-4 h-4 bg-white"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 bg-white"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-white"></div>

                <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br ${feature.color} p-3 border-2 border-white`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-['Press_Start_2P'] text-white mb-4 leading-relaxed">
                  {feature.title}
                </h3>

                <p className="text-lg font-['VT323'] text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-3 h-3 bg-white animate-pulse"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-black/50 border-2 border-purple-400 px-8 py-4">
            <p className="text-lg font-['VT323'] text-purple-300">
              + IN-GAME CHAT • SKILL-BASED PROGRESSION • USER-GENERATED CONTENT
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
