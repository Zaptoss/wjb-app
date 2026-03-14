import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import type { InfoNodeData } from '../../../types';
import { useFlowStore } from '../../../store/flowStore';

type InfoNodeType = Node<InfoNodeData, 'info'>;

export function InfoNode({ id, data, selected }: NodeProps<InfoNodeType>) {
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);

  return (
    <div
      onClick={() => setSelectedNodeId(id)}
      className="min-w-[200px] max-w-[260px] cursor-pointer rounded-xl border-2 shadow-sm transition-all"
      style={{
        backgroundColor: 'var(--node-info-bg)',
        borderColor: selected ? 'var(--node-info-border-selected)' : 'var(--node-info-border)',
        boxShadow: selected ? '0 10px 28px rgba(0, 0, 0, 0.22)' : undefined,
      }}
    >
      <div
        className="flex items-center gap-2 border-b px-3 py-2"
        style={{ borderBottomColor: 'var(--node-info-divider)' }}
      >
        <div
          className="flex h-5 w-5 items-center justify-center rounded"
          style={{ backgroundColor: 'var(--node-info-icon-bg)', color: 'var(--node-info-icon-text)' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--node-info-label)' }}>
          Info Page
        </span>
      </div>
      <div className="px-3 py-2">
        {data.imageUrl && (
          <img
            src={data.imageUrl}
            alt=""
            className="mb-3 h-24 w-full rounded-lg object-cover"
          />
        )}
        <p className="truncate text-sm font-medium" style={{ color: 'var(--node-info-title)' }}>
          {data.title || 'Untitled'}
        </p>
        {data.body && (
          <p className="mt-1 line-clamp-2 text-xs" style={{ color: 'var(--node-info-body)' }}>
            {data.body}
          </p>
        )}
      </div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ borderColor: 'var(--node-info-handle-border)', backgroundColor: 'var(--node-info-handle-bg)' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="default"
        style={{ borderColor: 'var(--node-info-handle-border)', backgroundColor: 'var(--node-info-handle-bg)' }}
      />
    </div>
  );
}
