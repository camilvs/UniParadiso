// ─── LevelCreatorPage.tsx ─────────────────────────────────────────────────────
// Level editor wrapped in the Game Gal console shell to match the project aesthetic.

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLevelStore }          from './LevelEditor/useLevelStore';
import { ErrorModal }             from './LevelEditor/ErrorModal';
import { DeleteConfirmModal }     from './LevelEditor/DeleteConfirm';
import { StartWindow }            from './LevelEditor/StartWindow';
import { LevelStatsForm }         from './LevelEditor/LevelStatsForm';
import { LoadLevelScreen }        from './LevelEditor/LoadLevelScreen';
import { LevelCanvas, LevelCanvasHandle } from './LevelEditor/LevelCanvas';
import { AssetPreview }           from './LevelEditor/AssetPreview';
import { AssetEditor }            from './LevelEditor/AssetEditor';
import { NPCEditor }              from './LevelEditor/NPCEditor';
import { NPCDialogueTestWindow }  from './LevelEditor/NPCDialogueWindow';

import {
  Level, LevelObject, LevelNPC,
  AssetCategory, TransformState, PortraitPosition,
} from './LevelEditor/levelEditorTypes';

type Screen = 'start' | 'create-form' | 'load' | 'editor';

type DeleteTarget =
  | { kind: 'level';  level: Level }
  | { kind: 'object'; obj: LevelObject }
  | { kind: 'npc';    npc: LevelNPC };

const NAV_BUTTONS: { id: AssetCategory; label: string }[] = [
  { id: 'backgrounds', label: 'BG'        },
  { id: 'tiles',       label: 'Tiles'     },
  { id: 'objects',     label: 'Objects'   },
  { id: 'npcs',        label: 'NPC'       },
  { id: 'chests',      label: 'Chest'     },
  { id: 'enemies',     label: 'Enemies'   },
  { id: 'landmarks',   label: 'Landmarks' },
];

export function AdminLevelCreate() {
  const navigate = useNavigate();
  const store    = useLevelStore();

  // ── screens ───────────────────────────────────────────────────────────────
  const [screen, setScreen] = useState<Screen>(() => {
    const saved = localStorage.getItem('activeScreen');
    if (saved === 'level_create_screen') return 'editor';
    if (saved === 'level_stats')         return 'create-form';
    if (saved === 'load_level_screen')   return 'load';
    return 'start';
  });

  function goTo(s: Screen) {
    setScreen(s);
    const idMap: Record<Screen, string> = {
      'start': 'start_window', 'create-form': 'level_stats',
      'load': 'load_level_screen', 'editor': 'level_create_screen',
    };
    localStorage.setItem('activeScreen', idMap[s]);
  }

  // ── ui state ──────────────────────────────────────────────────────────────
  const [errorMsg,      setErrorMsg]      = useState('');
  const [deleteTarget,  setDeleteTarget]  = useState<DeleteTarget | null>(null);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [showPauseMenu, setShowPauseMenu] = useState(false);

  // ── asset panel ───────────────────────────────────────────────────────────
  const [assetCategory,      setAssetCategory]      = useState<AssetCategory>(null);
  const [selectedTile,       setSelectedTile]        = useState<number | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<number | null>(null);

  // ── selected object ───────────────────────────────────────────────────────
  const [activeObject, setActiveObject] = useState<LevelObject | null>(null);
  const [objTransform, setObjTransform] = useState<TransformState>({ x:0,y:0,z:0,rz:0,s:1 });
  const [objPos,       setObjPos]       = useState({ x: 230, y: 750 });

  // ── selected npc ──────────────────────────────────────────────────────────
  const [activeNPC,    setActiveNPC]    = useState<LevelNPC | null>(null);
  const [npcTransform, setNpcTransform] = useState<TransformState>({ x:0,y:0,z:0,rz:0,s:1 });
  const [npcPos,       setNpcPos]       = useState({ x: 230, y: 750 });
  const [showNPCTest,  setShowNPCTest]  = useState(false);

  const canvasRef = useRef<LevelCanvasHandle | null>(null);

  // ── helpers ───────────────────────────────────────────────────────────────
  const nextPid = (l: Level) => (l.objects||[]).reduce((m,o)=>Math.max(m,o.p_id||0),0)+1;
  const nextNid = (l: Level) => (l.npcs||[]).reduce((m,n)=>Math.max(m,n.n_id||0),0)+1;

  // ── level actions ─────────────────────────────────────────────────────────
  function handleCreateLevel(name: string, size: string, desc: string) {
    store.createLevel(name, size as Level['size'], desc);
    goTo('editor');
  }

  function handleLoadLevel(level: Level) {
    store.loadLevel(level);
    goTo('editor');
  }

  function handleTilePaint(faceId: string, index: number, tileId: number) {
    store.updateCurrentLevel(l => {
      const faces = { ...l.faces };
      const arr   = [...((faces as any)[faceId] || [])];
      arr[index]  = tileId;
      (faces as any)[faceId] = arr;
      return { ...l, faces };
    });
  }

  function handleSelectBackground(id: number) {
    setSelectedBackground(id);
    canvasRef.current?.setBackground(id);
    store.updateCurrentLevel(l => ({ ...l, background: id }));
  }

  // ── object actions ────────────────────────────────────────────────────────
  function handleSelectObject(id: number) {
    if (!store.currentLevel) return;
    const p_id  = nextPid(store.currentLevel);
    const newObj: LevelObject = { p_id, sprite_id: id, left:230, top:750, z:0, rx:0, ry:0, rz:0, scale:1 };
    canvasRef.current?.addObject(newObj);
    store.updateCurrentLevel(l => ({ ...l, objects: [...l.objects, newObj] }));
    setActiveObject(newObj);
    setObjPos({ x:230, y:750 });
    setObjTransform({ x:0,y:0,z:0,rz:0,s:1 });
  }

  function handleCanvasSelectObject(obj: LevelObject) {
    setActiveObject(obj);
    setObjPos({ x: obj.left, y: obj.top });
    setObjTransform({ x: obj.rx, y: obj.ry, z: obj.z, rz: obj.rz, s: obj.scale });
  }

  function handleObjPosChange(axis: 'x'|'y', value: number) {
    if (!activeObject) return;
    const newPos = { ...objPos, [axis]: value };
    setObjPos(newPos);
    canvasRef.current?.updateObjectTransform(activeObject.p_id, objTransform, newPos.x, newPos.y);
    store.updateCurrentLevel(l => ({
      ...l, objects: l.objects.map(o => o.p_id === activeObject.p_id
        ? { ...o, left: newPos.x, top: newPos.y } : o),
    }));
  }

  function handleObjTransformChange(key: keyof TransformState, value: number) {
    if (!activeObject) return;
    const next = { ...objTransform, [key]: value };
    setObjTransform(next);
    canvasRef.current?.updateObjectTransform(activeObject.p_id, next, objPos.x, objPos.y);
    store.updateCurrentLevel(l => ({
      ...l, objects: l.objects.map(o => o.p_id === activeObject.p_id
        ? { ...o, z: next.z, rx: next.x, ry: next.y, rz: next.rz, scale: next.s } : o),
    }));
  }

  function handleDeleteObject() { if (activeObject) setDeleteTarget({ kind: 'object', obj: activeObject }); }
  function confirmDeleteObject() {
    if (!activeObject) return;
    canvasRef.current?.removeObject(activeObject.p_id);
    store.updateCurrentLevel(l => ({ ...l, objects: l.objects.filter(o => o.p_id !== activeObject.p_id) }));
    setActiveObject(null);
    setDeleteTarget(null);
  }

  // ── npc actions ───────────────────────────────────────────────────────────
  function handleSelectNPC(id: number) {
    if (!store.currentLevel) return;
    const n_id  = nextNid(store.currentLevel);
    const newNPC: LevelNPC = {
      n_id, sprite_id: id, left:230, top:750, z:0, rx:0, ry:0, rz:0, scale:1,
      portrait_left:0, portrait_top:0, portrait_scaleX:1, dialogue:'',
    };
    canvasRef.current?.addNPC(newNPC);
    store.updateCurrentLevel(l => ({ ...l, npcs: [...l.npcs, newNPC] }));
    setActiveNPC(newNPC);
    setNpcPos({ x:230, y:750 });
    setNpcTransform({ x:0,y:0,z:0,rz:0,s:1 });
  }

  function handleCanvasSelectNPC(npc: LevelNPC) {
    setActiveNPC(npc);
    setNpcPos({ x: npc.left, y: npc.top });
    setNpcTransform({ x: npc.rx, y: npc.ry, z: npc.z, rz: npc.rz, s: npc.scale });
  }

  function handleNpcPosChange(axis: 'x'|'y', value: number) {
    if (!activeNPC) return;
    const newPos = { ...npcPos, [axis]: value };
    setNpcPos(newPos);
    canvasRef.current?.updateNPCTransform(activeNPC.n_id, npcTransform, newPos.x, newPos.y);
    store.updateCurrentLevel(l => ({
      ...l, npcs: l.npcs.map(n => n.n_id === activeNPC.n_id
        ? { ...n, left: newPos.x, top: newPos.y } : n),
    }));
    setActiveNPC(prev => prev ? { ...prev, left: newPos.x, top: newPos.y } : prev);
  }

  function handleNpcTransformChange(key: keyof TransformState, value: number) {
    if (!activeNPC) return;
    const next = { ...npcTransform, [key]: value };
    setNpcTransform(next);
    canvasRef.current?.updateNPCTransform(activeNPC.n_id, next, npcPos.x, npcPos.y);
    store.updateCurrentLevel(l => ({
      ...l, npcs: l.npcs.map(n => n.n_id === activeNPC.n_id
        ? { ...n, z: next.z, rx: next.x, ry: next.y, rz: next.rz, scale: next.s } : n),
    }));
  }

  function handlePortraitChange(pos: PortraitPosition) {
    if (!activeNPC) return;
    setActiveNPC(prev => prev ? { ...prev, ...pos } : prev);
    store.updateCurrentLevel(l => ({
      ...l, npcs: l.npcs.map(n => n.n_id === activeNPC.n_id
        ? { ...n, portrait_left: pos.left, portrait_top: pos.top, portrait_scaleX: pos.scaleX } : n),
    }));
  }

  function handleDialogueChange(text: string) {
    if (!activeNPC) return;
    setActiveNPC(prev => prev ? { ...prev, dialogue: text } : prev);
    store.updateCurrentLevel(l => ({
      ...l, npcs: l.npcs.map(n => n.n_id === activeNPC.n_id ? { ...n, dialogue: text } : n),
    }));
  }

  function handleDeleteNPC() { if (activeNPC) setDeleteTarget({ kind: 'npc', npc: activeNPC }); }
  function confirmDeleteNPC() {
    if (!activeNPC) return;
    canvasRef.current?.removeNPC(activeNPC.n_id);
    store.updateCurrentLevel(l => ({ ...l, npcs: l.npcs.filter(n => n.n_id !== activeNPC.n_id) }));
    setActiveNPC(null);
    setDeleteTarget(null);
    setShowNPCTest(false);
  }

  function confirmDeleteLevel() {
    if (deleteTarget?.kind !== 'level') return;
    store.deleteLevel(deleteTarget.level.id);
    setDeleteTarget(null);
    if (store.currentLevel?.id === deleteTarget.level.id) goTo('start');
  }

  function handleTest() {
    if (!store.currentLevel) return;
    localStorage.setItem('test_level_id', String(store.currentLevel.id));
    navigate('/play_test');
  }

  function handleClear() {
    canvasRef.current?.clearTiles();
    store.updateCurrentLevel(l => ({
      ...l,
      faces: { face_back:[], face_left:[], face_right:[], face_top:[], face_bottom:[] },
      background: null,
    }));
    setMenuOpen(false);
  }

  function handleExitEditor() {
    store.setCurrentLevel(null);
    setActiveObject(null);
    setActiveNPC(null);
    goTo('start');
    setMenuOpen(false);
    setShowPauseMenu(false);
  }

  // ── delete modal props ────────────────────────────────────────────────────
  function deleteModalProps() {
    if (!deleteTarget) return null;
    if (deleteTarget.kind === 'level')  return { title: 'Delete Level:',  detail: deleteTarget.level.name,               onConfirm: confirmDeleteLevel  };
    if (deleteTarget.kind === 'object') return { title: 'Delete Object:', detail: `Sprite ${deleteTarget.obj.sprite_id}`, onConfirm: confirmDeleteObject };
    if (deleteTarget.kind === 'npc')    return { title: 'Delete NPC:',    detail: `Sprite ${deleteTarget.npc.sprite_id}`, onConfirm: confirmDeleteNPC    };
    return null;
  }
  const dm = deleteModalProps();

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black
                    flex items-start justify-center p-4 pt-8">

      <style>{`
        @keyframes scrollBackground {
          from { background-position: 0 0; }
          to   { background-position: -1000px 0; }
        }
      `}</style>

      {/* ── Global modals ── */}
      {errorMsg && <ErrorModal message={errorMsg} onClose={() => setErrorMsg('')} />}
      {deleteTarget && dm && (
        <DeleteConfirmModal
          title={dm.title} detail={dm.detail}
          onConfirm={dm.onConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* ── Animated background grid ── */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* ── Floating pixel decorations ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-2 h-2 bg-cyan-400 opacity-60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top:  `${Math.random() * 100}%`,
              animationDelay:    `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }} />
        ))}
      </div>

      <div className="relative w-full max-w-6xl z-10">

        {/* ═══════════════════════════════════════════════════
            GAME GAL CONSOLE SHELL
        ═══════════════════════════════════════════════════ */}
        <div className="relative bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600
                        border-8 border-purple-800 rounded-3xl shadow-2xl p-6
                        shadow-[0_0_50px_rgba(139,92,246,0.5)]">

          {/* ── Screen bezel ── */}
          <div className="bg-gradient-to-b from-indigo-900 to-black rounded-lg p-3 mb-6
                          border-4 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]
                          relative overflow-visible min-h-[480px]">

            {/* ══ START SCREEN ══ */}
            {screen === 'start' && (
              <div className="flex flex-col items-center justify-center min-h-[480px] gap-6">
                <h2 className="font-['Press_Start_2P'] text-cyan-300 text-2xl text-center
                               drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">
                  LEVEL CREATOR
                </h2>
                <StartWindow
                  onCreateNew={() => goTo('create-form')}
                  onLoad={() => goTo('load')}
                  onExit={() => navigate('/')}
                />
              </div>
            )}

            {/* ══ CREATE FORM ══ */}
            {screen === 'create-form' && (
              <div className="flex items-center justify-center min-h-[480px]">
                <LevelStatsForm
                  onSubmit={handleCreateLevel}
                  onExit={() => goTo('start')}
                  onError={setErrorMsg}
                />
              </div>
            )}

            {/* ══ LOAD SCREEN ══ */}
            {screen === 'load' && (
              <div className="flex items-center justify-center min-h-[480px]">
                <LoadLevelScreen
                  levels={store.levels}
                  onLoad={handleLoadLevel}
                  onDelete={level => setDeleteTarget({ kind: 'level', level })}
                  onExit={() => goTo('start')}
                />
              </div>
            )}

            {/* ══ EDITOR ══ */}
            {screen === 'editor' && (
              <div className="flex flex-col relative">

                {/* Editor top bar */}
                <div className="flex flex-row items-center justify-between mb-2 px-1 flex-wrap gap-2">

                  {/* Menu button + level name */}
                  <div className="flex flex-row items-center gap-2">
                    <div className="relative">
                      <button
                        onClick={() => setMenuOpen(o => !o)}
                        className="w-7 h-7 rounded cursor-pointer border-2 border-purple-300
                                   transition-all hover:scale-110 hover:border-cyan-400"
                        style={{ backgroundColor: 'rgb(87,50,114)' }}
                        title="Editor Menu"
                      />
                      {menuOpen && (
                        <div className="absolute top-9 left-0 z-30 flex flex-col border border-purple-500
                                        rounded overflow-hidden shadow-xl"
                             style={{ width: 130, backgroundColor: '#1e1b4b' }}>
                          {[
                            { label: 'Save',         action: () => setMenuOpen(false) },
                            { label: 'Test Level',   action: handleTest },
                            { label: 'Clear',        action: handleClear },
                            { label: 'Delete Level', action: () => {
                                if (store.currentLevel) setDeleteTarget({ kind:'level', level: store.currentLevel });
                                setMenuOpen(false);
                            }},
                          ].map(({ label, action }) => (
                            <button key={label} onClick={action}
                              className="font-['VT323'] text-base text-left px-3 py-1 transition-colors
                                         hover:bg-purple-800"
                              style={{ color: 'ghostwhite' }}
                              onMouseOver={e => (e.currentTarget.style.color = 'yellow')}
                              onMouseOut={e  => (e.currentTarget.style.color = 'ghostwhite')}>
                              {label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <span className="font-['VT323'] text-cyan-300 text-lg">
                      {store.currentLevel
                        ? `${store.currentLevel.name} · ${store.currentLevel.size}`
                        : 'No level loaded'}
                    </span>
                  </div>

                  {/* Asset category buttons */}
                  <div className="flex flex-row gap-1 flex-wrap">
                    {NAV_BUTTONS.map(({ id, label }) => (
                      <button key={id}
                        onClick={() => setAssetCategory(prev => prev === id ? null : id)}
                        className="font-['VT323'] text-xs text-white px-2 py-0.5 rounded
                                   cursor-pointer transition-all border"
                        style={{
                          backgroundColor: assetCategory === id ? 'rgb(87,50,114)' : '#1d4ed8',
                          borderColor:     assetCategory === id ? 'cyan' : 'transparent',
                          boxShadow:       assetCategory === id ? '0 0 8px rgba(34,211,238,0.6)' : 'none',
                        }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3-D canvas */}
                <LevelCanvas
                  level={store.currentLevel}
                  selectedTile={selectedTile}
                  dimFaces={assetCategory === 'backgrounds'}
                  onTilePaint={handleTilePaint}
                  onSelectObject={handleCanvasSelectObject}
                  onSelectNPC={handleCanvasSelectNPC}
                  canvasRef={canvasRef}
                />

                {/* Asset preview strip */}
                {assetCategory && (
                  <div className="mt-2 border-t-2 border-cyan-500/40">
                    <AssetPreview
                      category={assetCategory}
                      selectedId={
                        assetCategory === 'tiles'       ? selectedTile :
                        assetCategory === 'backgrounds' ? selectedBackground : null
                      }
                      onSelectBackground={handleSelectBackground}
                      onSelectTile={id => setSelectedTile(id)}
                      onSelectObject={handleSelectObject}
                      onSelectNPC={handleSelectNPC}
                    />
                  </div>
                )}

                {/* Floating panels */}
                {activeObject && (
                  <AssetEditor
                    spriteId={activeObject.sprite_id}
                    transform={objTransform}
                    posX={objPos.x}
                    posY={objPos.y}
                    onPosChange={handleObjPosChange}
                    onTransformChange={handleObjTransformChange}
                    onDelete={handleDeleteObject}
                    onClose={() => setActiveObject(null)}
                  />
                )}

                {activeNPC && (
                  <NPCEditor
                    spriteId={activeNPC.sprite_id}
                    transform={npcTransform}
                    posX={npcPos.x}
                    posY={npcPos.y}
                    portraitPos={{
                      left:   activeNPC.portrait_left,
                      top:    activeNPC.portrait_top,
                      scaleX: activeNPC.portrait_scaleX,
                    }}
                    dialogue={activeNPC.dialogue}
                    onPosChange={handleNpcPosChange}
                    onTransformChange={handleNpcTransformChange}
                    onPortraitChange={handlePortraitChange}
                    onDialogueChange={handleDialogueChange}
                    onTest={() => setShowNPCTest(true)}
                    onDelete={handleDeleteNPC}
                    onClose={() => setActiveNPC(null)}
                  />
                )}

                {showNPCTest && activeNPC && (
                  <NPCDialogueTestWindow
                    npc={activeNPC}
                    onClose={() => setShowNPCTest(false)}
                  />
                )}

              </div>
            )}
          </div>{/* /screen bezel */}

          {/* ── Console label ── */}
          <div className="text-center mb-4">
            <h2 className="text-white font-['Press_Start_2P'] text-xl tracking-wider
                           drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
              GAME GAL — CREATOR EDITION
            </h2>
          </div>

          {/* ── Controller strip ── */}
          <div className="bg-gradient-to-b from-cyan-400 to-cyan-500 rounded-2xl p-5
                          border-4 border-cyan-600 shadow-inner">
            <div className="flex items-center justify-between gap-4 flex-wrap">

              {/* Left — hints */}
              <div className="flex flex-col gap-0.5">
                <p className="font-['VT323'] text-indigo-900 text-lg leading-tight">
                  Click tiles to paint &bull; Click entities to edit
                </p>
                <p className="font-['VT323'] text-indigo-900 text-base leading-tight">
                  Drag floating panels &bull; Auto-saves on every change
                </p>
              </div>

              {/* Center — action buttons (only shown in editor) */}
              <div className="flex flex-row gap-3 flex-wrap justify-center">
                {screen === 'editor' ? (
                  <>
                    <button
                      onClick={() => {/* auto-saved */}}
                      className="bg-purple-600 hover:bg-purple-500 text-white font-['Press_Start_2P']
                                 text-xs px-5 py-3 border-4 border-purple-800 rounded transition-all
                                 hover:scale-105 shadow-lg">
                      SAVE
                    </button>
                    <button
                      onClick={handleTest}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white font-['Press_Start_2P']
                                 text-xs px-5 py-3 border-4 border-cyan-800 rounded transition-all
                                 hover:scale-105 shadow-lg">
                      TEST
                    </button>
                    <button
                      onClick={() => setShowPauseMenu(true)}
                      className="bg-pink-600 hover:bg-pink-500 text-white font-['Press_Start_2P']
                                 text-xs px-5 py-3 border-4 border-pink-800 rounded transition-all
                                 hover:scale-105 shadow-lg">
                      MENU
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate('/')}
                    className="bg-pink-600 hover:bg-pink-500 text-white font-['Press_Start_2P']
                               text-xs px-5 py-3 border-4 border-pink-800 rounded transition-all
                               hover:scale-105 shadow-lg">
                    EXIT
                  </button>
                )}
              </div>

              {/* Right — speaker holes */}
              <div className="flex flex-col gap-1.5">
                {[...Array(4)].map((_, row) => (
                  <div key={row} className="flex gap-1.5">
                    {[...Array(6)].map((_, col) => (
                      <div key={col} className="w-2 h-2 bg-indigo-900 rounded-full opacity-70" />
                    ))}
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ── Brand text ── */}
          <div className="text-center mt-4">
            <p className="text-white font-['VT323'] text-lg
                          drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
              UNI PARADISO EDITION — LEVEL CREATOR
            </p>
          </div>

        </div>{/* /console shell */}

        {/* ── Instruction text below console ── */}
        <div className="mt-4 text-center">
          <p className="text-cyan-400 font-['VT323'] text-lg">
            Pick a category above the screen &bull; Paint tiles &bull; Place entities &bull; Save
          </p>
        </div>

      </div>{/* /max-w */}

      {/* ══ PAUSE / EXIT MENU ══ */}
      {showPauseMenu && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-purple-900 to-indigo-900
                          border-8 border-purple-400 rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-white font-['Press_Start_2P'] text-2xl text-center mb-8">
              CREATOR MENU
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => setShowPauseMenu(false)}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-['Press_Start_2P']
                           text-lg py-4 px-6 border-4 border-white transition-all hover:scale-105">
                RESUME
              </button>
              <button
                onClick={handleTest}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-['Press_Start_2P']
                           text-lg py-4 px-6 border-4 border-white transition-all hover:scale-105">
                TEST LEVEL
              </button>
              <button
                onClick={handleExitEditor}
                className="w-full bg-pink-600 hover:bg-pink-500 text-white font-['Press_Start_2P']
                           text-lg py-4 px-6 border-4 border-white transition-all hover:scale-105">
                EXIT TO MENU
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
