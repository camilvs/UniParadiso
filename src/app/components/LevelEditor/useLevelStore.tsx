// ─── useLevelStore.ts ─────────────────────────────────────────────────────────
// Centralises all localStorage reads/writes so components stay clean.

import { useState, useCallback } from 'react';
import { Level, ensureLevelShape } from './levelEditorTypes';

const DEFAULT_LEVELS: Level[] = [
  {
    id: 1,
    name: 'test',
    size: 'room',
    desc: 'This is a test',
    background: 3,
    faces: { face_back: [], face_left: [], face_right: [], face_top: [], face_bottom: [] },
    objects: [],
    npcs: [],
  },
];

function loadFromStorage(): Level[] {
  try {
    const saved = localStorage.getItem('levels');
    if (!saved) return DEFAULT_LEVELS;
    const parsed: Level[] = JSON.parse(saved);
    return parsed.map(ensureLevelShape);
  } catch {
    return DEFAULT_LEVELS;
  }
}

export function useLevelStore() {
  const [levels, setLevels] = useState<Level[]>(() => loadFromStorage());
  const [currentLevel, setCurrentLevel] = useState<Level | null>(() => {
    const id = Number(localStorage.getItem('current_level_id'));
    if (!id) return null;
    const all = loadFromStorage();
    return ensureLevelShape(all.find(l => l.id === id) ?? null!) ?? null;
  });

  // ── persist ──────────────────────────────────────────────────────────────
  const saveLevels = useCallback((next: Level[]) => {
    localStorage.setItem('levels', JSON.stringify(next));
    setLevels(next);
  }, []);

  const saveCurrentLevel = useCallback((level: Level | null) => {
    if (level) {
      localStorage.setItem('current_level_id', String(level.id));
    } else {
      localStorage.removeItem('current_level_id');
    }
    setCurrentLevel(level);
  }, []);

  // ── mutations ─────────────────────────────────────────────────────────────
  const createLevel = useCallback((name: string, size: Level['size'], desc: string) => {
    const all = loadFromStorage();
    const newLevel = ensureLevelShape({
      id: all.length + 1,
      name,
      size,
      desc,
      background: null,
      faces: { face_back: [], face_left: [], face_right: [], face_top: [], face_bottom: [] },
      objects: [],
      npcs: [],
    });
    const next = [...all, newLevel];
    saveLevels(next);
    saveCurrentLevel(newLevel);
    return newLevel;
  }, [saveLevels, saveCurrentLevel]);

  const updateCurrentLevel = useCallback((updater: (l: Level) => Level) => {
    setCurrentLevel(prev => {
      if (!prev) return prev;
      const updated = updater(prev);
      setLevels(all => {
        const next = all.map(l => l.id === updated.id ? updated : l);
        localStorage.setItem('levels', JSON.stringify(next));
        return next;
      });
      return updated;
    });
  }, []);

  const deleteLevel = useCallback((id: number) => {
    setLevels(all => {
      const next = all.filter(l => l.id !== id);
      localStorage.setItem('levels', JSON.stringify(next));
      return next;
    });
    setCurrentLevel(prev => {
      if (prev?.id === id) {
        localStorage.removeItem('current_level_id');
        return null;
      }
      return prev;
    });
  }, []);

  const loadLevel = useCallback((level: Level) => {
    const shaped = ensureLevelShape(level);
    saveCurrentLevel(shaped);
    return shaped;
  }, [saveCurrentLevel]);

  return {
    levels,
    currentLevel,
    setCurrentLevel: saveCurrentLevel,
    createLevel,
    updateCurrentLevel,
    deleteLevel,
    loadLevel,
  };
}
