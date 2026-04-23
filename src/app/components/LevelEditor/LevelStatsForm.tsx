// ─── LevelStatsForm.tsx ───────────────────────────────────────────────────────

import { useState } from 'react';

interface LevelStatsFormProps {
  onSubmit: (name: string, size: string, desc: string) => void;
  onExit: () => void;
  onError: (msg: string) => void;
}

const menuItemClass =
  'flex flex-col bg-gray-900 mb-0.5 cursor-pointer';
const labelClass = 'font-["VT323"] text-ghostwhite text-base px-1 pt-0.5';
const inputClass =
  'bg-gray-800 text-ghostwhite font-["VT323"] text-base border-0 outline-none px-1';

export function LevelStatsForm({ onSubmit, onExit, onError }: LevelStatsFormProps) {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [desc, setDesc] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { onError('Please name your creation...'); return; }
    if (!size)        { onError('Please choose a size...');       return; }
    onSubmit(name.trim(), size, desc);
  }

  return (
    <div className="w-60 border border-gray-700 flex flex-col" style={{ height: 282 }}>
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        {/* Name */}
        <div className={menuItemClass}>
          <span className={labelClass} style={{ color: 'ghostwhite' }}>Level Name:</span>
          <input
            className={inputClass}
            style={{ color: 'ghostwhite' }}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        {/* Size */}
        <div className={menuItemClass}>
          <span className={labelClass} style={{ color: 'ghostwhite' }}>Level Size:</span>
          <select
            className={inputClass}
            style={{ color: 'ghostwhite' }}
            value={size}
            onChange={e => setSize(e.target.value)}
          >
            <option value="">Choose Size</option>
            <option value="room">Room</option>
            <option value="small">Small</option>
            <option value="mid">Mid</option>
            <option value="large">Large</option>
          </select>
        </div>

        {/* Description */}
        <div className={menuItemClass}>
          <span className={labelClass} style={{ color: 'ghostwhite' }}>Level Description:</span>
          <textarea
            className={`${inputClass} resize-none`}
            style={{ width: 240, height: 140, color: 'ghostwhite' }}
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-gray-900 text-ghostwhite font-['VT323'] text-lg py-1 mb-0.5 cursor-pointer
                     hover:text-yellow-400 transition-colors"
          style={{ color: 'ghostwhite' }}
          onMouseOver={e => (e.currentTarget.style.color = 'yellow')}
          onMouseOut={e  => (e.currentTarget.style.color = 'ghostwhite')}
        >
          Create
        </button>

        <button
          type="button"
          onClick={onExit}
          className="bg-gray-900 text-ghostwhite font-['VT323'] text-lg py-1 cursor-pointer
                     hover:text-yellow-400 transition-colors"
          style={{ color: 'ghostwhite' }}
          onMouseOver={e => (e.currentTarget.style.color = 'yellow')}
          onMouseOut={e  => (e.currentTarget.style.color = 'ghostwhite')}
        >
          Exit
        </button>
      </form>
    </div>
  );
}
