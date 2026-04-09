// ─── Shared Types ────────────────────────────────────────────────────────────

export interface LevelFaces {
  face_back: (number | undefined)[];
  face_left: (number | undefined)[];
  face_right: (number | undefined)[];
  face_top: (number | undefined)[];
  face_bottom: (number | undefined)[];
}

export interface LevelObject {
  p_id: number;
  sprite_id: number;
  left: number;
  top: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  scale: number;
}

export interface LevelNPC {
  n_id: number;
  sprite_id: number;
  left: number;
  top: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  scale: number;
  portrait_left: number;
  portrait_top: number;
  portrait_scaleX: number;
  dialogue: string;
}

export interface Level {
  id: number;
  name: string;
  size: 'room' | 'small' | 'mid' | 'large';
  desc: string;
  background: number | null;
  faces: LevelFaces;
  objects: LevelObject[];
  npcs: LevelNPC[];
}

export type TransformState = {
  x: number;
  y: number;
  z: number;
  rz: number;
  s: number;
};

export type PortraitPosition = {
  left: number;
  top: number;
  scaleX: number;
};

export type AssetCategory = 'backgrounds' | 'tiles' | 'objects' | 'npcs' | 'chests' | 'enemies' | 'landmarks' | null;

export const TILE = 120;
export const TOTAL_TILES = 96;
export const TOTAL_BACKGROUNDS = 13;
export const TOTAL_OBJECTS = 29;
export const NPC_AMOUNT = 2;
export const PORTRAIT_STEP = 3;

export const CHEST_STYLES = ['Red', 'Wooden', 'Gold', 'Green', 'Blue', 'Silver', 'Wood Box', 'Red Box'];

export function ensureLevelShape(level: Level): Level {
  return {
    ...level,
    faces: level.faces ?? {
      face_back: [], face_left: [], face_right: [], face_top: [], face_bottom: []
    },
    objects: Array.isArray(level.objects) ? level.objects : [],
    npcs: Array.isArray(level.npcs) ? level.npcs : [],
  };
}

export function buildTransformString(t: TransformState): string {
  return `translateZ(${t.z}px) rotateX(${t.x}deg) rotateY(${t.y}deg) rotateZ(${t.rz}deg) scale(${t.s})`;
}

export function parseTransformString(transform: string): TransformState {
  const zMatch  = transform.match(/translateZ\(([-0-9.]+)px\)/);
  const xMatch  = transform.match(/rotateX\(([-0-9.]+)deg\)/);
  const yMatch  = transform.match(/rotateY\(([-0-9.]+)deg\)/);
  const rzMatch = transform.match(/rotateZ\(([-0-9.]+)deg\)/);
  const sMatch  = transform.match(/scale\(([-0-9.]+)\)/);
  return {
    z:  zMatch  ? Number(zMatch[1])  : 0,
    x:  xMatch  ? Number(xMatch[1])  : 0,
    y:  yMatch  ? Number(yMatch[1])  : 0,
    rz: rzMatch ? Number(rzMatch[1]) : 0,
    s:  sMatch  ? Number(sMatch[1])  : 1,
  };
}
