import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import type { EndNodeData } from '../../../types';
import { useFlowStore } from '../../../store/flowStore';

type EndNodeType = Node<EndNodeData, 'end'>;

export function EndNode({ id, selected }: NodeProps<EndNodeType>) {
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);

  return (
    <div
      onClick={() => setSelectedNodeId(id)}
      className={`min-w-[160px] rounded-xl border-2 bg-red-50 ${selected ? 'border-red-500 shadow-lg' : 'border-red-200'} cursor-pointer shadow-sm transition-all`}
    >
      <div className="flex items-center gap-2 px-3 py-3">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-red-200 text-red-700">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
        </div>
        <span className="text-sm font-semibold text-red-700">End Flow</span>
      </div>
      <Handle type="target" position={Position.Left} className="!border-red-400 !bg-red-100" />
    </div>
  );
}
