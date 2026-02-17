import { Github, Twitter, MessageCircle, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t-4 border-purple-500 relative overflow-hidden">
      {/* Pixel pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(45deg, #8b5cf6 25%, transparent 25%),
            linear-gradient(-45deg, #8b5cf6 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #8b5cf6 75%),
            linear-gradient(-45deg, transparent 75%, #8b5cf6 75%)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-['Press_Start_2P'] text-white mb-4 leading-relaxed">
              UNI
              <br />
              PARADISO
            </h3>
            <p className="text-base font-['VT323'] text-purple-300 leading-relaxed">
              GAMING AS IT WAS MEANT TO BE
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-['Press_Start_2P'] text-cyan-400 mb-6 leading-relaxed">
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              {['About', 'Features', 'Community', 'Documentation'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-lg font-['VT323'] text-purple-300 hover:text-cyan-400 transition-colors inline-block hover:translate-x-2 transform transition-transform"
                  >
                    {'>'} {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-['Press_Start_2P'] text-cyan-400 mb-6 leading-relaxed">
              CONNECT
            </h4>
            <div className="flex gap-4">
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Twitter, label: 'Twitter' },
                { icon: MessageCircle, label: 'Discord' },
                { icon: Mail, label: 'Email' }
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-12 h-12 bg-purple-600 hover:bg-cyan-400 border-2 border-white flex items-center justify-center group transition-all transform hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6 text-white group-hover:text-black transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t-2 border-purple-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-['VT323'] text-purple-400 text-center md:text-left text-lg">
              © 2026 UNI PARADISO. NO RIGHTS RESERVED. PLAY FREE, LIVE FREE.
            </p>
            <div className="flex gap-6">
              {['PRIVACY', 'TERMS', 'CODE OF CONDUCT'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs font-['VT323'] text-purple-400 hover:text-cyan-400 transition-colors text-base"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Pixel art decoration */}
        <div className="mt-8 flex justify-center">
          <div className="inline-grid grid-cols-8 gap-1">
            {[...Array(64)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 ${
                  Math.random() > 0.5 ? 'bg-purple-500' : 'bg-cyan-500'
                } ${Math.random() > 0.7 ? 'opacity-50' : 'opacity-100'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
