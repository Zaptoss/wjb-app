import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import type { EndNodeData } from '../../../types';
import { useFlowStore } from '../../../store/flowStore';

type EndNodeType = Node<EndNodeData, 'end'>;

export function EndNode({ id, selected }: NodeProps<EndNodeType>) {
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);

  return (
    <div
      onClick={() => setSelectedNodeId(id)}
      className="min-w-[160px] cursor-pointer rounded-xl border-2 shadow-sm transition-all"
      style={{
        backgroundColor: 'var(--node-end-bg)',
        borderColor: selected ? 'var(--node-end-border-selected)' : 'var(--node-end-border)',
        boxShadow: selected ? '0 10px 28px rgba(0, 0, 0, 0.22)' : undefined,
      }}
    >
      <div className="flex items-center gap-2 px-3 py-3">
        <div
          className="flex h-5 w-5 items-center justify-center rounded"
          style={{ backgroundColor: 'var(--node-end-icon-bg)', color: 'var(--node-end-icon-text)' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
        </div>
        <span className="text-sm font-semibold" style={{ color: 'var(--node-end-label)' }}>End Flow</span>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ borderColor: 'var(--node-end-handle-border)', backgroundColor: 'var(--node-end-handle-bg)' }}
      />
    </div>
  );
}
