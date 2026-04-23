// ─── ErrorModal.tsx ───────────────────────────────────────────────────────────

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

export function ErrorModal({ message, onClose }: ErrorModalProps) {
  if (!message) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50">
      <div className="w-60 rounded-xl bg-crimson border-2 border-red-800 p-4 text-center"
           style={{ backgroundColor: 'crimson' }}>
        <p className="font-['Press_Start_2P'] text-white text-sm mb-2">ERROR!</p>
        <p className="font-['VT323'] text-white text-xl">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="mt-3 w-32 bg-gray-900 text-white font-['VT323'] text-lg hover:text-yellow-400 transition-colors border border-gray-700 rounded px-3 py-1"
      >
        CLOSE
      </button>
    </div>
  );
}
