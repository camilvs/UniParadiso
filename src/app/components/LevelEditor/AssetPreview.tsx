// ─── AssetPreview.tsx ─────────────────────────────────────────────────────────

import { AssetCategory, TOTAL_TILES, TOTAL_BACKGROUNDS, TOTAL_OBJECTS, NPC_AMOUNT } from './levelEditorTypes';

interface AssetPreviewProps {
  category: AssetCategory;
  selectedId: number | null;
  onSelectBackground: (id: number) => void;
  onSelectTile: (id: number) => void;
  onSelectObject: (id: number) => void;
  onSelectNPC: (id: number) => void;
}

function AssetThumb({
  src, selected, onClick, extraClass = '',
}: { src: string; selected: boolean; onClick: () => void; extraClass?: string }) {
  return (
    <div
      onClick={onClick}
      className={`w-16 h-16 m-1 cursor-pointer bg-cover ${extraClass}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        outline: selected ? '2px solid yellow' : 'none',
      }}
    />
  );
}

export function AssetPreview({
  category, selectedId,
  onSelectBackground, onSelectTile, onSelectObject, onSelectNPC,
}: AssetPreviewProps) {
  if (!category) return null;

  return (
    <div
      className="flex flex-wrap overflow-y-scroll"
      style={{ width: 889, height: 380, backgroundColor: '#222', position: 'relative', top: 0, left: 8 }}
    >
      {category === 'backgrounds' &&
        Array.from({ length: TOTAL_BACKGROUNDS }, (_, i) => (
          <AssetThumb key={i} src={`./images/background${i}.png`}
            selected={selectedId === i} onClick={() => onSelectBackground(i)} />
        ))}

      {category === 'tiles' &&
        Array.from({ length: TOTAL_TILES }, (_, i) => (
          <AssetThumb key={i} src={`./images/tile${i}.png`}
            selected={selectedId === i} onClick={() => onSelectTile(i)} />
        ))}

      {category === 'objects' &&
        Array.from({ length: TOTAL_OBJECTS }, (_, i) => (
          <AssetThumb key={i} src={`./images/object${i}.png`}
            selected={selectedId === i} onClick={() => onSelectObject(i)} />
        ))}

      {category === 'npcs' &&
        Array.from({ length: NPC_AMOUNT }, (_, i) => (
          <AssetThumb key={i} src={`./images/npc_${i}.png`}
            selected={selectedId === i} onClick={() => onSelectNPC(i)} />
        ))}

      {(category === 'chests' || category === 'enemies' || category === 'landmarks') && (
        <div className="font-['VT323'] text-yellow-400 text-xl p-4">
          {category.charAt(0).toUpperCase() + category.slice(1)} — coming soon
        </div>
      )}
    </div>
  );
}
