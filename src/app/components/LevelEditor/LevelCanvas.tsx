// ─── LevelCanvas.tsx ─────────────────────────────────────────────────────────
// Renders the 3-D cube room. Tile painting, object/NPC click-selection all
// happen here via event delegation — matching the original vanilla JS approach.

import { useRef, useEffect, useCallback } from 'react';
import {
  Level, LevelObject, LevelNPC, TILE,
  buildTransformString, parseTransformString, TransformState,
} from './levelEditorTypes';

interface LevelCanvasProps {
  level: Level | null;
  selectedTile: number | null;
  dimFaces: boolean;                      // true when background tab active
  onTilePaint: (faceId: string, index: number, tileId: number) => void;
  onSelectObject: (obj: LevelObject) => void;
  onSelectNPC: (npc: LevelNPC) => void;
  /** Expose imperative handles so the parent can update DOM elements directly */
  canvasRef: React.RefObject<LevelCanvasHandle | null>;
}

export interface LevelCanvasHandle {
  addObject: (obj: LevelObject) => HTMLDivElement;
  addNPC:    (npc: LevelNPC)    => HTMLDivElement;
  updateObjectTransform: (p_id: number, t: TransformState, left: number, top: number) => void;
  updateNPCTransform:    (n_id: number, t: TransformState, left: number, top: number) => void;
  removeObject: (p_id: number) => void;
  removeNPC:    (n_id: number)  => void;
  setBackground: (id: number | null) => void;
  clearTiles: () => void;
}

const COLS = 5;
const ROWS = 5;
const ROOM_W = TILE * COLS;   // 600
const ROOM_H = TILE * ROWS;
const ROOM_D = ROOM_W;

function makeFaceStyle(id: string): React.CSSProperties {
  const base: React.CSSProperties = {
    position: 'absolute',
    opacity: 1,
    backgroundSize: `${TILE}px`,
    display: 'grid',
    gridTemplateColumns: `repeat(${COLS}, ${TILE}px)`,
    gridTemplateRows:    `repeat(${ROWS}, ${TILE}px)`,
  };
  switch (id) {
    case 'face_back':
      return { ...base, width: ROOM_W, height: 480, transform: `rotateY(180deg) translateZ(${ROOM_D / 2}px)`, top: 510 };
    case 'face_left':
      return { ...base, width: ROOM_D, height: 480, left: 0,   transform: `rotateY(-90deg) translateZ(${ROOM_W / 2}px)`, top: 510 };
    case 'face_right':
      return { ...base, width: ROOM_D, height: 480, left: 60,  transform: `rotateY(90deg) translateZ(240px)`, top: 510 };
    case 'face_top':
      return { ...base, width: ROOM_W, height: ROOM_H, top: 300, transform: 'rotateX(-90deg) translateZ(0px)' };
    case 'face_bottom':
      return { ...base, width: ROOM_W, height: ROOM_H, top: 300, transform: 'rotateX(-90deg) translateZ(390px)' };
    default: return base;
  }
}

const FACE_IDS = ['face_back', 'face_left', 'face_right', 'face_top', 'face_bottom'];

export function LevelCanvas({
  level, selectedTile, dimFaces, onTilePaint, onSelectObject, onSelectNPC, canvasRef,
}: LevelCanvasProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const cubeRef    = useRef<HTMLDivElement>(null);
  const isPainting = useRef(false);

  // ── tile painting ─────────────────────────────────────────────────────────
  function paintTile(target: EventTarget | null, force = false) {
    if (!force && !isPainting.current) return;
    const el = target as HTMLElement;
    if (!el?.classList.contains('lc-tile') || selectedTile === null) return;
    el.style.backgroundImage = `url(./images/tile${selectedTile}.png)`;
    el.style.backgroundSize  = `${TILE}px ${TILE}px`;
    const faceId = el.dataset.face!;
    const index  = Number(el.dataset.index);
    onTilePaint(faceId, index, selectedTile);
  }

  // ── object / npc selection via delegation ─────────────────────────────────
  function handleCubeClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    const objEl  = target.closest('.lc-object') as HTMLElement | null;
    const npcEl  = target.closest('.lc-npc')    as HTMLElement | null;

    if (objEl && cubeRef.current?.contains(objEl)) {
      const p_id = Number(objEl.dataset.p_id);
      const rec  = level?.objects.find(o => o.p_id === p_id);
      if (rec) onSelectObject(rec);
    }
    if (npcEl && cubeRef.current?.contains(npcEl)) {
      const n_id = Number(npcEl.dataset.n_id);
      const rec  = level?.npcs.find(n => n.n_id === n_id);
      if (rec) onSelectNPC(rec);
    }
  }

  // ── rebuild DOM when level changes ────────────────────────────────────────
  useEffect(() => {
    const cube = cubeRef.current;
    const preview = previewRef.current;
    if (!cube || !level) return;

    // clear old objects/npcs
    cube.querySelectorAll('.lc-object, .lc-npc').forEach(el => el.remove());

    // background
    if (preview) {
      preview.style.backgroundImage = level.background != null
        ? `url(./images/background${level.background}.png)`
        : 'url(./images/background0.png)';
    }

    // paint tiles
    FACE_IDS.forEach(faceId => {
      const face = cube.querySelector(`#${faceId}`);
      if (!face) return;
      const tiles = face.querySelectorAll('.lc-tile');
      tiles.forEach(tile => {
        const idx    = (tile as HTMLElement).dataset.index!;
        const tileId = level.faces[faceId as keyof typeof level.faces]?.[Number(idx)];
        (tile as HTMLElement).style.backgroundImage = tileId !== undefined
          ? `url(./images/tile${tileId}.png)` : '';
        (tile as HTMLElement).style.backgroundSize  = tileId !== undefined ? `${TILE}px ${TILE}px` : '';
      });
    });

    // recreate objects
    (level.objects || []).forEach(obj => {
      const el = createObjectEl(obj);
      cube.appendChild(el);
    });

    // recreate npcs
    (level.npcs || []).forEach(npc => {
      const el = createNPCEl(npc);
      cube.appendChild(el);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level?.id]);

  // ── imperative handle ─────────────────────────────────────────────────────
  function createObjectEl(obj: LevelObject): HTMLDivElement {
    const el = document.createElement('div');
    el.classList.add('lc-object');
    el.dataset.id  = String(obj.sprite_id);
    el.dataset.p_id = String(obj.p_id);
    Object.assign(el.style, {
      width: '120px', height: '120px', position: 'absolute',
      left: obj.left + 'px', top: obj.top + 'px',
      backgroundImage: `url(./images/object${obj.sprite_id}.png)`,
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
      transform: buildTransformString({ x: obj.rx, y: obj.ry, z: obj.z, rz: obj.rz, s: obj.scale }),
    });
    return el;
  }

  function createNPCEl(npc: LevelNPC): HTMLDivElement {
    const el = document.createElement('div');
    el.classList.add('lc-npc');
    el.dataset.id  = String(npc.sprite_id);
    el.dataset.n_id = String(npc.n_id);
    Object.assign(el.style, {
      width: '120px', height: '120px', position: 'absolute',
      left: npc.left + 'px', top: npc.top + 'px',
      backgroundImage: `url(./images/npc_${npc.sprite_id}.png)`,
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
      transform: buildTransformString({ x: npc.rx, y: npc.ry, z: npc.z, rz: npc.rz, s: npc.scale }),
    });
    return el;
  }

  const handle: LevelCanvasHandle = {
    addObject(obj) {
      const el = createObjectEl(obj);
      cubeRef.current?.appendChild(el);
      return el;
    },
    addNPC(npc) {
      const el = createNPCEl(npc);
      cubeRef.current?.appendChild(el);
      return el;
    },
    updateObjectTransform(p_id, t, left, top) {
      const el = cubeRef.current?.querySelector(`.lc-object[data-p_id="${p_id}"]`) as HTMLElement | null;
      if (!el) return;
      el.style.left      = left + 'px';
      el.style.top       = top  + 'px';
      el.style.transform = buildTransformString(t);
    },
    updateNPCTransform(n_id, t, left, top) {
      const el = cubeRef.current?.querySelector(`.lc-npc[data-n_id="${n_id}"]`) as HTMLElement | null;
      if (!el) return;
      el.style.left      = left + 'px';
      el.style.top       = top  + 'px';
      el.style.transform = buildTransformString(t);
    },
    removeObject(p_id) {
      cubeRef.current?.querySelector(`.lc-object[data-p_id="${p_id}"]`)?.remove();
    },
    removeNPC(n_id) {
      cubeRef.current?.querySelector(`.lc-npc[data-n_id="${n_id}"]`)?.remove();
    },
    setBackground(id) {
      if (!previewRef.current) return;
      previewRef.current.style.backgroundImage = id != null
        ? `url(./images/background${id}.png)` : '';
    },
    clearTiles() {
      cubeRef.current?.querySelectorAll('.lc-tile').forEach(t => {
        (t as HTMLElement).style.backgroundImage = '';
      });
      if (previewRef.current) previewRef.current.style.backgroundImage = '';
    },
  };

  // expose handle
  useEffect(() => {
    if (canvasRef && 'current' in canvasRef) {
      (canvasRef as React.MutableRefObject<LevelCanvasHandle | null>).current = handle;
    }
  });

  return (
    <div
      ref={previewRef}
      id="create_level_preview"
      className="scrolling-background"
      style={{
        width: '98%', height: 600, border: '1px solid black',
        marginLeft: 8, marginTop: 2,
        perspective: 800, overflowY: 'hidden', overflowX: 'scroll',
        backgroundImage: 'url(./images/background0.png)',
        backgroundRepeat: 'repeat-x',
        animation: 'scrollBackground 20s linear infinite',
      }}
      onMouseDown={e => {
        isPainting.current = true;
        paintTile(e.target, true);
      }}
      onMouseUp={() => { isPainting.current = false; }}
      onMouseLeave={() => { isPainting.current = false; }}
      onMouseOver={e => paintTile(e.target)}
      onClick={handleCubeClick}
    >
      {/* Cube */}
      <div
        ref={cubeRef}
        style={{
          width: ROOM_W, height: ROOM_H, position: 'relative',
          transformStyle: 'preserve-3d', margin: '0 auto',
          transform: 'translateZ(0px)', top: -500,
        }}
      >
        {FACE_IDS.map(faceId => (
          <div
            key={faceId}
            id={faceId}
            style={{
              ...makeFaceStyle(faceId),
              opacity: dimFaces ? 0.2 : 1,
              transition: 'opacity 0.2s',
            }}
            onMouseOver={e => {
              const t = e.target as HTMLElement;
              if (t.classList.contains('lc-tile')) t.style.backgroundColor = 'rgba(255,255,0,0.4)';
            }}
            onMouseOut={e => {
              const t = e.target as HTMLElement;
              if (t.classList.contains('lc-tile')) t.style.backgroundColor = '';
            }}
          >
            {Array.from({ length: COLS * ROWS }, (_, i) => (
              <div
                key={i}
                className="lc-tile"
                data-face={faceId}
                data-index={i}
                style={{ width: TILE, height: TILE, boxSizing: 'border-box', border: '1px solid rgba(255,255,255,0)' }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
