// ─── NPCEditor.tsx ────────────────────────────────────────────────────────────

import { useRef } from 'react';
import { TransformState, PortraitPosition, PORTRAIT_STEP } from './levelEditorTypes';

interface NPCEditorProps {
  spriteId: number | null;
  transform: TransformState;
  posX: number;
  posY: number;
  portraitPos: PortraitPosition;
  dialogue: string;
  onPosChange: (axis: 'x' | 'y', value: number) => void;
  onTransformChange: (key: keyof TransformState, value: number) => void;
  onPortraitChange: (pos: PortraitPosition) => void;
  onDialogueChange: (text: string) => void;
  onTest: () => void;
  onDelete: () => void;
  onClose: () => void;
  defaultLeft?: number;
  defaultTop?: number;
}

function SliderRow({ label, min, max, value, onChange }: {
  label: string; min: number; max: number; value: number; onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-row justify-around items-center">
      <span className="font-['VT323'] text-gray-700 w-5 text-center">{label}</span>
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))} className="w-28 accent-yellow-400" />
      <output className="font-['VT323'] text-gray-700 w-8 text-right text-sm">{value}</output>
    </div>
  );
}

const arrowBtnClass =
  'w-4 bg-gray-900 rounded text-ghostwhite flex items-center justify-center text-sm cursor-pointer hover:text-yellow-400 transition-colors select-none';

export function NPCEditor({
  spriteId, transform, posX, posY, portraitPos, dialogue,
  onPosChange, onTransformChange, onPortraitChange,
  onDialogueChange, onTest, onDelete, onClose,
  defaultLeft = 120, defaultTop = 120,
}: NPCEditorProps) {
  const winRef = useRef<HTMLDivElement>(null);
  const drag   = useRef<{ ox: number; oy: number } | null>(null);

  function onHeaderMouseDown(e: React.MouseEvent) {
    if (!winRef.current) return;
    drag.current = { ox: e.clientX - winRef.current.offsetLeft, oy: e.clientY - winRef.current.offsetTop };
    const move = (me: MouseEvent) => {
      if (!drag.current || !winRef.current) return;
      winRef.current.style.left = (me.clientX - drag.current.ox) + 'px';
      winRef.current.style.top  = (me.clientY - drag.current.oy) + 'px';
    };
    const up = () => { drag.current = null; document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  function nudgePortrait(dx: number, dy: number, flipToggle = false) {
    onPortraitChange({
      left:   portraitPos.left + dx,
      top:    portraitPos.top  + dy,
      scaleX: flipToggle ? (portraitPos.scaleX === 1 ? -1 : 1) : portraitPos.scaleX,
    });
  }

  const portraitStyle = {
    backgroundImage: `url(./images/npc_${spriteId}.png)`,
    backgroundSize: '200%',
    backgroundPosition: `${portraitPos.left}px ${portraitPos.top}px`,
    backgroundRepeat: 'no-repeat',
    transform: `scaleX(${portraitPos.scaleX})`,
    transformOrigin: 'center',
    backgroundColor: 'aliceblue',
  };

  if (spriteId === null) return null;

  return (
    <div
      ref={winRef}
      className="absolute z-40 flex flex-col border border-gray-600 bg-gray-100"
      style={{ width: 254, height: 442, left: defaultLeft, top: defaultTop }}
    >
      {/* Header */}
      <div className="flex flex-row border-b border-gray-400 items-center" style={{ height: 28, width: 250 }}>
        <div
          className="flex-1 h-7 cursor-move font-['VT323'] text-2xl pl-1 select-none"
          onMouseDown={onHeaderMouseDown}
        >
          NPC {spriteId}
        </div>
        <button onClick={onClose}
          className="w-7 h-7 border border-gray-500 flex items-center justify-center font-['VT323'] text-lg hover:bg-red-500 hover:text-white transition-colors">
          X
        </button>
      </div>

      {/* Previews */}
      <div className="flex flex-row gap-1 m-1" style={{ height: 124 }}>
        <div className="w-28 h-28 border border-gray-400"
          style={{ backgroundImage: `url(./images/npc_${spriteId}.png)`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: 'aliceblue' }} />
        <div className="w-28 h-28 border border-gray-400" style={portraitStyle} />
      </div>

      {/* Dialogue box */}
      <div className="border border-gray-400 mt-0.5 flex flex-col" style={{ width: 250, height: 120 }}>
        {/* Dialogue toolbar */}
        <div className="flex flex-row items-center justify-between border-b border-gray-700 px-1"
             style={{ fontSize: 12, height: 20, width: 242 }}>
          <span className="font-['VT323']">Dialogue Box:</span>
          <button onClick={onTest}
            className="bg-gray-900 text-ghostwhite font-['VT323'] text-sm px-1 rounded cursor-pointer hover:text-yellow-400 transition-colors"
            style={{ color: 'ghostwhite' }}>
            Test
          </button>
          {/* Portrait nudge arrows */}
          <div className="flex flex-row gap-0.5">
            {([
              { title: 'portrait left',  html: '←', dx: PORTRAIT_STEP,  dy: 0 },
              { title: 'portrait up',    html: '↑', dx: 0,              dy: -PORTRAIT_STEP },
              { title: 'portrait down',  html: '↓', dx: 0,              dy: PORTRAIT_STEP },
              { title: 'portrait right', html: '→', dx: -PORTRAIT_STEP, dy: 0 },
            ] as const).map(({ title, html, dx, dy }) => (
              <button key={title} title={title} className={arrowBtnClass}
                style={{ color: 'ghostwhite' }}
                onClick={() => nudgePortrait(dx, dy)}>
                {html}
              </button>
            ))}
            <button title="flip" className="bg-gray-900 text-ghostwhite rounded text-xs px-0.5 cursor-pointer hover:text-yellow-400 transition-colors"
              style={{ color: 'ghostwhite' }}
              onClick={() => nudgePortrait(0, 0, true)}>
              Flip
            </button>
          </div>
        </div>

        <textarea
          className="flex-1 font-['VT323'] text-sm p-1 resize-none"
          style={{ backgroundColor: '#222', color: 'ghostwhite', height: 98 }}
          value={dialogue}
          onChange={e => onDialogueChange(e.target.value)}
        />
      </div>

      {/* Transform sliders */}
      <div className="flex flex-col justify-evenly" style={{ width: 254, height: 174 }}>
        <SliderRow label="X"  min={-60}  max={530} value={posX}        onChange={v => onPosChange('x', v)} />
        <SliderRow label="Y"  min={528}  max={920} value={posY}        onChange={v => onPosChange('y', v)} />
        <SliderRow label="Z"  min={-300} max={400} value={transform.z} onChange={v => onTransformChange('z', v)} />
        <SliderRow label="Ry" min={0}    max={359} value={transform.y} onChange={v => onTransformChange('y', v)} />
        <SliderRow label="Rx" min={0}    max={359} value={transform.x} onChange={v => onTransformChange('x', v)} />
        <SliderRow label="Rz" min={0}    max={359} value={transform.rz} onChange={v => onTransformChange('rz', v)} />
        <SliderRow label="SC" min={1}    max={4}   value={transform.s} onChange={v => onTransformChange('s', v)} />
        <button onClick={onDelete}
          className="bg-gray-900 font-['VT323'] text-base text-center cursor-pointer hover:text-yellow-400 transition-colors"
          style={{ color: 'ghostwhite' }}
          onMouseOver={e => (e.currentTarget.style.color = 'yellow')}
          onMouseOut={e  => (e.currentTarget.style.color = 'ghostwhite')}>
          Delete
        </button>
      </div>
    </div>
  );
}
