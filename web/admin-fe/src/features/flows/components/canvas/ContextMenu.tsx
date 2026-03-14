import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useFlowStore } from '../../store/flowStore';

export type ContextMenuTarget =
  | { kind: 'canvas'; position: { x: number; y: number } }
  | { kind: 'node'; nodeId: string }
  | { kind: 'edge'; edgeId: string };

interface Props {
  target: ContextMenuTarget;
  mousePos: { x: number; y: number };
  onClose: () => void;
  onAddNode: (type: string, position: { x: number; y: number }) => void;
}

export function ContextMenu({ target, mousePos, onClose, onAddNode }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const deleteNode = useFlowStore((s) => s.deleteNode);
  const deleteEdge = useFlowStore((s) => s.deleteEdge);
  const duplicateNode = useFlowStore((s) => s.duplicateNode);
  const copyFlow = useFlowStore((s) => s.copyFlow);
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);
  const setSelectedEdgeId = useFlowStore((s) => s.setSelectedEdgeId);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [onClose]);

  const Item = ({ label, onClick, danger }: { label: string; onClick: () => void; danger?: boolean }) => (
    <button
      className={`flex w-full items-center px-3 py-1.5 text-left text-sm hover:bg-gray-50 ${danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'}`}
      onClick={() => { onClick(); onClose(); }}
    >
      {label}
    </button>
  );

  const Divider = () => <div className="my-1 h-px bg-gray-100" />;

  const NODE_TYPES = ['info', 'question', 'offer', 'end'] as const;
  const NODE_LABELS: Record<string, string> = {
    info: 'Add Info Page',
    question: 'Add Question',
    offer: 'Add Offer',
    end: 'Add End Flow',
  };

  return createPortal(
    <div
      ref={ref}
      style={{ top: mousePos.y, left: mousePos.x }}
      className="absolute z-50 min-w-[180px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
    >
      {target.kind === 'canvas' && (
        <>
          {NODE_TYPES.map((t) => (
            <Item key={t} label={NODE_LABELS[t] ?? t} onClick={() => onAddNode(t, target.position)} />
          ))}
          <Divider />
          <Item label="Copy Flow" onClick={copyFlow} />
        </>
      )}
      {target.kind === 'node' && (
        <>
          <Item label="Edit Properties" onClick={() => setSelectedNodeId(target.nodeId)} />
          <Item label="Duplicate Node" onClick={() => duplicateNode(target.nodeId)} />
          <Divider />
          <Item label="Copy Flow" onClick={copyFlow} />
          <Divider />
          <Item label="Delete Node" onClick={() => deleteNode(target.nodeId)} danger />
        </>
      )}
      {target.kind === 'edge' && (
        <>
          <Item label="Edit Conditions" onClick={() => setSelectedEdgeId(target.edgeId)} />
          <Divider />
          <Item label="Delete Edge" onClick={() => deleteEdge(target.edgeId)} danger />
        </>
      )}
    </div>,
    document.body
  );
}
