import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useFlowStore } from '../../store/flowStore';

export type ContextMenuTarget =
  | { kind: 'canvas'; position: { x: number; y: number } }
  | { kind: 'node'; nodeId: string }
  | { kind: 'selection'; nodeIds: string[] }
  | { kind: 'edge'; edgeId: string };

interface Props {
  target: ContextMenuTarget;
  mousePos: { x: number; y: number };
  onClose: () => void;
  onAddNode: (type: string, position: { x: number; y: number }) => void;
  onPasteAt: (position: { x: number; y: number }) => void;
}

export function ContextMenu({ target, mousePos, onClose, onAddNode, onPasteAt }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const deleteNode = useFlowStore((s) => s.deleteNode);
  const deleteNodes = useFlowStore((s) => s.deleteNodes);
  const deleteEdge = useFlowStore((s) => s.deleteEdge);
  const duplicateNode = useFlowStore((s) => s.duplicateNode);
  const copyFlow = useFlowStore((s) => s.copyFlow);
  const copySelected = useFlowStore((s) => s.copySelected);
  const pasteFlow = useFlowStore((s) => s.pasteFlow);
  const clearFlow = useFlowStore((s) => s.clearFlow);
  const clipboardFlow = useFlowStore((s) => s.clipboardFlow);
  const setSelectedEdgeId = useFlowStore((s) => s.setSelectedEdgeId);
  const canPaste = Boolean(clipboardFlow && clipboardFlow.nodes.length > 0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
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

  const Item = ({
    label,
    onClick,
    danger,
    disabled,
  }: {
    label: string;
    onClick: () => void;
    danger?: boolean;
    disabled?: boolean;
  }) => (
    <button
      disabled={disabled}
      className={`flex w-full items-center px-3 py-1.5 text-left text-sm ${
        disabled
          ? 'cursor-not-allowed opacity-40'
          : danger
            ? 'text-red-600 hover:bg-red-50'
            : 'text-gray-700 hover:bg-gray-50'
      }`}
      onClick={() => {
        if (disabled) return;
        onClick();
        onClose();
      }}
    >
      {label}
    </button>
  );

  const Divider = () => <div className="my-1 h-px bg-gray-100" />;

  const NODE_TYPES = ['info', 'question', 'offer'] as const;
  const NODE_LABELS: Record<string, string> = {
    info: 'Add Info Page',
    question: 'Add Question',
    offer: 'Add Offer',
  };

  return createPortal(
    <div
      ref={ref}
      style={{ top: mousePos.y, left: mousePos.x }}
      className="absolute z-50 min-w-[200px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
    >
      {target.kind === 'canvas' && (
        <>
          {NODE_TYPES.map((t) => (
            <Item key={t} label={NODE_LABELS[t] ?? t} onClick={() => onAddNode(t, target.position)} />
          ))}
          <Divider />
          <Item label="Copy Flow" onClick={copyFlow} />
          <Item label="Paste Flow" onClick={() => onPasteAt(target.position)} disabled={!canPaste} />
          <Divider />
          <Item
            label="Delete Flow"
            onClick={() => {
              if (window.confirm('Delete all nodes in this flow?')) clearFlow();
            }}
            danger
          />
        </>
      )}

      {target.kind === 'node' && (
        <>
          <Item label="Duplicate Node" onClick={() => duplicateNode(target.nodeId)} />
          <Divider />
          <Item label="Copy Flow" onClick={copyFlow} />
          <Item label="Paste Flow" onClick={pasteFlow} disabled={!canPaste} />
          <Divider />
          <Item label="Delete Node" onClick={() => deleteNode(target.nodeId)} danger />
        </>
      )}

      {target.kind === 'selection' && (
        <>
          <Item label={`Delete Selected (${target.nodeIds.length})`} onClick={() => deleteNodes(target.nodeIds)} danger />
          <Divider />
          <Item label="Copy Selected" onClick={() => copySelected(target.nodeIds)} />
          <Item label="Paste Flow" onClick={pasteFlow} disabled={!canPaste} />
          <Divider />
          <Item
            label="Delete Flow"
            onClick={() => {
              if (window.confirm('Delete all nodes in this flow?')) clearFlow();
            }}
            danger
          />
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
