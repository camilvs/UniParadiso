// ─── StartWindow.tsx ──────────────────────────────────────────────────────────

interface StartWindowProps {
  onCreateNew: () => void;
  onLoad: () => void;
  onExit: () => void;
}

export function StartWindow({ onCreateNew, onLoad, onExit }: StartWindowProps) {
  return (
    <div className="flex flex-col w-36 border border-gray-700 rounded overflow-hidden">
      {[
        { label: 'Create New', onClick: onCreateNew },
        { label: 'Load',       onClick: onLoad },
        { label: 'Exit',       onClick: onExit },
      ].map(({ label, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          className="bg-gray-900 text-ghostwhite font-['VT323'] text-lg text-left px-2 py-1 mb-0.5
                     hover:text-yellow-400 transition-colors cursor-pointer border-0"
          style={{ color: 'ghostwhite' }}
          onMouseOver={e => (e.currentTarget.style.color = 'yellow')}
          onMouseOut={e  => (e.currentTarget.style.color = 'ghostwhite')}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
