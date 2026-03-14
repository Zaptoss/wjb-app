import { useNavigate } from 'react-router-dom';
import { useFlowStore } from '../../store/flowStore';

interface Props {
  isDirty: boolean;
  onSave: () => void;
}

export function FlowToolbar({ isDirty, onSave }: Props) {
  const flowName = useFlowStore((s) => s.flowName);
  const setFlowName = useFlowStore((s) => s.setFlowName);
  const past = useFlowStore((s) => s.past);
  const future = useFlowStore((s) => s.future);
  const undo = useFlowStore((s) => s.undo);
  const redo = useFlowStore((s) => s.redo);
  const navigate = useNavigate();

  return (
    <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-gray-100 bg-white px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/flows')}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Flows
        </button>
        <span className="text-gray-200">/</span>
        <input
          value={flowName}
          onChange={(e) => setFlowName(e.target.value)}
          className="rounded-md border border-transparent bg-transparent px-2 py-1 text-sm font-semibold text-gray-800 outline-none hover:border-gray-200 focus:border-gray-300 focus:bg-gray-50"
        />
        {isDirty && <span className="h-2 w-2 rounded-full bg-amber-400" title="Unsaved changes" />}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={undo}
          disabled={past.length === 0}
          title="Undo (Ctrl+Z)"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
          </svg>
        </button>
        <button
          onClick={redo}
          disabled={future.length === 0}
          title="Redo (Ctrl+Shift+Z)"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/>
          </svg>
        </button>
        <button
          onClick={onSave}
          className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
          </svg>
          Save
        </button>
      </div>
    </div>
  );
}
