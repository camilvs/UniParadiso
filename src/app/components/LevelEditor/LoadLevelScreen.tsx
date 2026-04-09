// ─── LoadLevelScreen.tsx ──────────────────────────────────────────────────────

import { Level } from './levelEditorTypes';

interface LoadLevelScreenProps {
  levels: Level[];
  onLoad: (level: Level) => void;
  onDelete: (level: Level) => void;
  onExit: () => void;
}

const btnClass =
  'w-16 h-8 bg-gray-900 font-["VT323"] text-base text-center cursor-pointer transition-colors';

export function LoadLevelScreen({ levels, onLoad, onDelete, onExit }: LoadLevelScreenProps) {
  return (
    <div className="flex flex-col border border-gray-700" style={{ width: 280, height: 240 }}>
      <p className="font-['VT323'] text-base px-1" style={{ color: 'ghostwhite', background: '#222' }}>
        Load Levels:
      </p>

      <div className="overflow-y-auto flex-1" style={{ width: 270 }}>
        {levels.map(level => (
          <div
            key={level.id}
            className="border-b border-gray-700 flex flex-col mb-1 px-1"
            style={{ color: 'ghostwhite', backgroundColor: '#222' }}
          >
            <span className="font-['VT323'] text-sm">
              {level.name} | size: {level.size}
              <br />Description: {level.desc}
            </span>

            <div className="flex flex-row justify-evenly py-1">
              <button
                className={btnClass}
                style={{ color: 'ghostwhite' }}
                onMouseOver={e => (e.currentTarget.style.color = 'yellow')}
                onMouseOut={e  => (e.currentTarget.style.color = 'ghostwhite')}
                onClick={() => onLoad(level)}
              >
                Load
              </button>
              <button
                className={btnClass}
                style={{ color: 'ghostwhite' }}
                onMouseOver={e => (e.currentTarget.style.color = 'yellow')}
                onMouseOut={e  => (e.currentTarget.style.color = 'ghostwhite')}
                onClick={() => onDelete(level)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onExit}
        className="bg-gray-900 font-['VT323'] text-base py-1 cursor-pointer transition-colors"
        style={{ color: 'ghostwhite' }}
        onMouseOver={e => (e.currentTarget.style.color = 'yellow')}
        onMouseOut={e  => (e.currentTarget.style.color = 'ghostwhite')}
      >
        Exit
      </button>
    </div>
  );
}
