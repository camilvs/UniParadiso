// ─── DeleteConfirmModal.tsx ───────────────────────────────────────────────────

interface DeleteConfirmModalProps {
  title: string;
  detail: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ title, detail, onConfirm, onCancel }: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-60 rounded-xl border border-red-900 flex flex-col items-center pt-4 pb-6 gap-3"
           style={{ backgroundColor: 'crimson' }}>
        <p className="font-['VT323'] text-white text-xl text-center leading-tight">
          Are you sure?<br />{title}
        </p>
        <p className="font-['VT323'] text-white text-lg text-center">{detail}</p>
        <button
          onClick={onCancel}
          className="w-32 bg-gray-900 text-white font-['VT323'] text-lg hover:text-yellow-400 transition-colors py-1 rounded"
        >
          No
        </button>
        <button
          onClick={onConfirm}
          className="w-32 bg-gray-900 text-white font-['VT323'] text-lg hover:text-yellow-400 transition-colors py-1 rounded"
        >
          Yes
        </button>
      </div>
    </div>
  );
}
