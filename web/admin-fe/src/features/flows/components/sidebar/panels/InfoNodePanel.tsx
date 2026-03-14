import { useFlowStore } from '../../../store/flowStore';
import type { InfoNodeData } from '../../../types';

export function InfoNodePanel({ nodeId, data }: { nodeId: string; data: InfoNodeData }) {
  const updateNodeData = useFlowStore((s) => s.updateNodeData);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Title</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => updateNodeData(nodeId, { title: e.target.value })}
          placeholder="Page title"
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-gray-400"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Body Text</label>
        <textarea
          value={data.body}
          onChange={(e) => updateNodeData(nodeId, { body: e.target.value })}
          placeholder="Motivational or informational text..."
          rows={4}
          className="w-full resize-y rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-gray-400"
        />
      </div>
    </div>
  );
}
