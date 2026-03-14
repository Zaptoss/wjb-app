import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlowStore } from '../../store/flowStore';

interface Props {
  isDirty: boolean;
  onSave: () => void;
}

export function FlowToolbar({ isDirty, onSave }: Props) {
  const flowName = useFlowStore((s) => s.flowName);
  const setFlowName = useFlowStore((s) => s.setFlowName);
  const nodes = useFlowStore((s) => s.nodes);
  const past = useFlowStore((s) => s.past);
  const future = useFlowStore((s) => s.future);
  const clipboardFlow = useFlowStore((s) => s.clipboardFlow);
  const copyFlow = useFlowStore((s) => s.copyFlow);
  const copySelected = useFlowStore((s) => s.copySelected);
  const pasteFlow = useFlowStore((s) => s.pasteFlow);
  const undo = useFlowStore((s) => s.undo);
  const redo = useFlowStore((s) => s.redo);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const navigate = useNavigate();
  const canPaste = Boolean(clipboardFlow && clipboardFlow.nodes.length > 0);
  const selectedNodeIds = nodes.filter((node) => node.selected).map((node) => node.id);
  const hasSelection = selectedNodeIds.length > 0;

  const handleCopy = () => {
    if (hasSelection) copySelected(selectedNodeIds);
    else copyFlow();
  };

  useEffect(() => {
    if (!isHelpOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsHelpOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isHelpOpen]);

  return (
    <>
      <div className="flex h-14 flex-shrink-0 items-center justify-between px-4" style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}>
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
            onClick={handleCopy}
            title={hasSelection ? 'Copy selected nodes (Ctrl/Cmd+C)' : 'Copy whole flow (Ctrl/Cmd+C)'}
            className="flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            {hasSelection ? `Copy Selected (${selectedNodeIds.length})` : 'Copy Flow'}
          </button>
          <button
            onClick={() => pasteFlow()}
            disabled={!canPaste}
            title="Paste copied flow (Ctrl/Cmd+V)"
            className="flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H8a2 2 0 0 1-2-2V7"/>
              <path d="M5 3h11a2 2 0 0 1 2 2v11"/>
              <path d="M9 3v4h6V3"/>
            </svg>
            Paste Flow
          </button>
          {!canPaste && (
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              copy first
            </span>
          )}
          <button
            onClick={() => setIsHelpOpen(true)}
            title="Keyboard shortcuts"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-base font-semibold text-gray-600 hover:bg-gray-50"
            aria-label="Open shortcuts help"
          >
            ?
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
      {isHelpOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-[1px]"
          onClick={() => setIsHelpOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Flow editor shortcuts"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Hotkeys & Tips</h3>
              <button
                className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                onClick={() => setIsHelpOpen(false)}
              >
                Esc
              </button>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span>Select multiple nodes</span>
                <code className="rounded bg-white px-2 py-0.5 text-xs">Shift + Drag</code>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span>Duplicate node or selected flow while dragging</span>
                <code className="rounded bg-white px-2 py-0.5 text-xs">Ctrl/Cmd + Drag</code>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span>Copy selected nodes or whole flow</span>
                <code className="rounded bg-white px-2 py-0.5 text-xs">Ctrl/Cmd + C</code>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span>Paste copied flow</span>
                <code className="rounded bg-white px-2 py-0.5 text-xs">Ctrl/Cmd + V</code>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span>Delete selected nodes/edges</span>
                <code className="rounded bg-white px-2 py-0.5 text-xs">Delete / Backspace</code>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span>Open context actions</span>
                <code className="rounded bg-white px-2 py-0.5 text-xs">Right Click</code>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span>Undo / Redo</span>
                <code className="rounded bg-white px-2 py-0.5 text-xs">Ctrl/Cmd + Z / Ctrl/Cmd + Shift + Z</code>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
