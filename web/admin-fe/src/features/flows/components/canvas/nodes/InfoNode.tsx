import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import type { InfoNodeData } from '../../../types';
import { useFlowStore } from '../../../store/flowStore';

type InfoNodeType = Node<InfoNodeData, 'info'>;

export function InfoNode({ id, data, selected }: NodeProps<InfoNodeType>) {
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);

  return (
    <div
      onClick={() => setSelectedNodeId(id)}
      className={`min-w-[200px] max-w-[260px] rounded-xl border-2 bg-amber-50 ${selected ? 'border-amber-500 shadow-lg' : 'border-amber-200'} cursor-pointer shadow-sm transition-all`}
    >
      <div className="flex items-center gap-2 border-b border-amber-200 px-3 py-2">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-amber-200 text-amber-700">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">Info Page</span>
      </div>
      <div className="px-3 py-2">
        {data.imageUrl && (
          <img
            src={data.imageUrl}
            alt=""
            className="mb-3 h-24 w-full rounded-lg object-cover"
          />
        )}
        <p className="truncate text-sm font-medium text-gray-800">{data.title || 'Untitled'}</p>
        {data.body && <p className="mt-1 line-clamp-2 text-xs text-gray-500">{data.body}</p>}
      </div>
      <Handle type="target" position={Position.Left} className="!border-amber-400 !bg-amber-100" />
      <Handle type="source" position={Position.Right} id="default" className="!border-amber-400 !bg-amber-100" />
    </div>
  );
}
