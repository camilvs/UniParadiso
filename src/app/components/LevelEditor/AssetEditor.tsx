// ─── AssetEditor.tsx ─────────────────────────────────────────────────────────
// Draggable panel for positioning/rotating a placed object.

import { useRef } from 'react';
import { TransformState } from './levelEditorTypes';

interface AssetEditorProps {
  spriteId: number | null;
  transform: TransformState;
  posX: number;
  posY: number;
  onPosChange: (axis: 'x' | 'y', value: number) => void;
  onTransformChange: (key: keyof TransformState, value: number) => void;
  onDelete: () => void;
  onClose: () => void;
  /** initial window position */
  defaultLeft?: number;
  defaultTop?: number;
}

function SliderRow({
  label, id, min, max, value, onChange, step = 1,
}: {
  label: string; id: string; min: number; max: number;
  value: number; onChange: (v: number) => void; step?: number;
}) {
  return (
    <div className="flex flex-row justify-around items-center">
      <span className="font-['VT323'] text-gray-300 w-5 text-center">{label}</span>
      <input
        id={id} type="range" min={min} max={max} step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-28 accent-yellow-400"
      />
      <output className="font-['VT323'] text-gray-300 w-8 text-right text-sm">{value}</output>
    </div>
  );
}

export function AssetEditor({
  spriteId, transform, posX, posY,
  onPosChange, onTransformChange, onDelete, onClose,
  defaultLeft = 120, defaultTop = 200,
}: AssetEditorProps) {
  const winRef = useRef<HTMLDivElement>(null);
  const drag   = useRef<{ ox: number; oy: number } | null>(null);

  function onHeaderMouseDown(e: React.MouseEvent) {
    if (!winRef.current) return;
    drag.current = {
      ox: e.clientX - winRef.current.offsetLeft,
      oy: e.clientY - winRef.current.offsetTop,
    };
    const move = (me: MouseEvent) => {
      if (!drag.current || !winRef.current) return;
      winRef.current.style.left = (me.clientX - drag.current.ox) + 'px';
      winRef.current.style.top  = (me.clientY - drag.current.oy) + 'px';
    };
    const up = () => { drag.current = null; document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  if (spriteId === null) return null;

  return (
    <div
      ref={winRef}
      className="absolute z-40 flex flex-col border border-gray-600 bg-gray-100"
      style={{ width: 240, height: 380, left: defaultLeft, top: defaultTop }}
    >
      {/* Header */}
      <div className="flex flex-row border-b border-gray-400 items-center"
           style={{ height: 32 }}>
        <div
          className="flex-1 h-7 cursor-move font-['VT323'] text-2xl pl-1 select-none"
          onMouseDown={onHeaderMouseDown}
          title="drag to move"
        >
          Object {spriteId}
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 border border-gray-500 text-center font-['VT323'] text-lg
                     hover:bg-red-500 hover:text-white transition-colors"
        >X</button>
      </div>

      {/* Preview */}
      <div
        className="w-44 h-44 border border-gray-400 mx-auto mt-2 mb-1"
        style={{
          backgroundImage: `url(./images/object${spriteId}.png)`,
          backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
          backgroundColor: 'aliceblue',
        }}
      />

      {/* Sliders */}
      <div className="flex flex-col justify-evenly border border-gray-300 mx-auto"
           style={{ width: 180, height: 160 }}>
        <SliderRow label="X"  id="ax"  min={-60}  max={530} value={posX}             onChange={v => onPosChange('x', v)} />
        <SliderRow label="Y"  id="ay"  min={528}  max={920} value={posY}             onChange={v => onPosChange('y', v)} />
        <SliderRow label="Z"  id="az"  min={-300} max={400} value={transform.z}      onChange={v => onTransformChange('z', v)} />
        <SliderRow label="Ry" id="ary" min={0}    max={359} value={transform.y}      onChange={v => onTransformChange('y', v)} />
        <SliderRow label="Rx" id="arx" min={0}    max={359} value={transform.x}      onChange={v => onTransformChange('x', v)} />
        <SliderRow label="Rz" id="arz" min={0}    max={359} value={transform.rz}     onChange={v => onTransformChange('rz', v)} />
        <SliderRow label="SC" id="asc" min={1}    max={4}   value={transform.s}      onChange={v => onTransformChange('s', v)} />

        <button
          onClick={onDelete}
          className="bg-gray-900 text-ghostwhite font-['VT323'] text-base text-center cursor-pointer
                     hover:text-yellow-400 transition-colors"
          style={{ color: 'ghostwhite' }}
          onMouseOver={e => (e.currentTarget.style.color = 'yellow')}
          onMouseOut={e  => (e.currentTarget.style.color = 'ghostwhite')}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
