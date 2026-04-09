// ─── NPCDialogueTestWindow.tsx ────────────────────────────────────────────────

import { useRef, useEffect, useCallback } from 'react';
import { LevelNPC } from './levelEditorTypes';

interface NPCDialogueTestWindowProps {
  npc: LevelNPC | null;
  onClose: () => void;
  defaultLeft?: number;
  defaultTop?: number;
}

export function NPCDialogueTestWindow({
  npc, onClose, defaultLeft = 0, defaultTop = 12,
}: NPCDialogueTestWindowProps) {
  const winRef     = useRef<HTMLDivElement>(null);
  const boxRef     = useRef<HTMLDivElement>(null);
  const drag       = useRef<{ ox: number; oy: number } | null>(null);
  const animActive = useRef(false);
  const cancelRef  = useRef(false);

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

  const animateText = useCallback((text: string) => {
    if (!boxRef.current) return;
    boxRef.current.innerHTML = '';
    cancelRef.current = false;
    animActive.current = true;
    let i = 0;
    function step() {
      if (cancelRef.current || !boxRef.current) { animActive.current = false; return; }
      if (i < text.length) {
        boxRef.current.innerHTML += text[i++];
        setTimeout(step, 24);
      } else {
        animActive.current = false;
      }
    }
    step();
  }, []);

  useEffect(() => {
    if (npc) {
      animateText(npc.dialogue || '');
    }
    return () => { cancelRef.current = true; };
  }, [npc, animateText]);

  function handleReplay() {
    if (!npc) return;
    cancelRef.current = true;
    setTimeout(() => animateText(npc.dialogue || ''), 0);
  }

  if (!npc) return null;

  const portraitStyle = {
    backgroundImage: `url(./images/npc_${npc.sprite_id}.png)`,
    backgroundSize: '200%',
    backgroundPosition: `${npc.portrait_left ?? 0}px ${npc.portrait_top ?? 0}px`,
    backgroundRepeat: 'no-repeat',
    transform: `scaleX(${npc.portrait_scaleX ?? 1})`,
    transformOrigin: 'center',
    backgroundColor: 'aliceblue',
  };

  return (
    <div
      ref={winRef}
      className="absolute z-50 flex flex-col border border-gray-700"
      style={{ width: 420, height: 164, left: defaultLeft, top: defaultTop, backgroundColor: 'ghostwhite' }}
    >
      {/* Replay blinker */}
      <button
        onClick={handleReplay}
        title="Replay"
        className="absolute w-6 h-6 rounded-full border-2 border-white bg-gray-900 cursor-pointer hover:bg-yellow-400 transition-colors"
        style={{ left: 376, top: 126 }}
      />

      {/* Header */}
      <div className="flex flex-row border-b border-gray-400 items-center" style={{ height: 28 }}>
        <div
          className="flex-1 cursor-move select-none font-['VT323'] text-lg pl-1"
          onMouseDown={onHeaderMouseDown}
        >
          NPC {npc.sprite_id} — Test Dialogue
        </div>
        <button onClick={onClose}
          className="w-7 h-7 border border-gray-500 flex items-center justify-center font-['VT323'] text-lg hover:bg-red-500 hover:text-white transition-colors">
          X
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-row">
        <div
          className="border border-gray-900 flex-shrink-0"
          style={{ width: 120, height: 120, margin: '8px 8px 0 8px', ...portraitStyle }}
        />
        <div
          ref={boxRef}
          className="font-['VT323'] text-base p-1 overflow-hidden"
          style={{ width: 276, height: 116, margin: 8, backgroundColor: '#222', color: 'ghostwhite' }}
        />
      </div>
    </div>
  );
}
