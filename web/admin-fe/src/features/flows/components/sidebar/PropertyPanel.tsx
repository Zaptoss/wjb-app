import { useFlowStore } from '../../store/flowStore';
import { InfoNodePanel } from './panels/InfoNodePanel';
import { QuestionNodePanel } from './panels/QuestionNodePanel';
import { OfferNodePanel } from './panels/OfferNodePanel';
import { EndNodePanel } from './panels/EndNodePanel';
import type { NodeData, EdgeData } from '../../types';

const panelStyle = { borderLeft: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface)' };

function DeleteAction({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <div className="p-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <button
        type="button"
        onClick={onClick}
        className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors"
        style={{ backgroundColor: 'var(--danger)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--danger-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--danger)';
        }}
      >
        {label}
      </button>
    </div>
  );
}

export function PropertyPanel() {
  const selectedNodeId = useFlowStore((s) => s.selectedNodeId);
  const selectedEdgeId = useFlowStore((s) => s.selectedEdgeId);
  const nodes = useFlowStore((s) => s.nodes);
  const edges = useFlowStore((s) => s.edges);
  const deleteNode = useFlowStore((s) => s.deleteNode);
  const deleteEdge = useFlowStore((s) => s.deleteEdge);
  const updateEdgeData = useFlowStore((s) => s.updateEdgeData);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  const selectedEdge = edges.find((e) => e.id === selectedEdgeId);

  const NODE_TYPE_LABELS: Record<string, string> = {
    info: 'Info Page',
    question: 'Question',
    offer: 'Offer',
    end: 'End Flow',
  };

  if (!selectedNode && !selectedEdge) {
    return (
      <div className="flex w-72 flex-shrink-0 flex-col" style={panelStyle}>
        <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Properties</h2>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: 'var(--bg-muted)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </div>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>No selection</p>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Click a node or edge to edit its properties</p>
        </div>
      </div>
    );
  }

  if (selectedEdge) {
    const edgeData = (selectedEdge.data as EdgeData) ?? { conditions: [] };
    return (
      <div className="flex w-72 flex-shrink-0 flex-col" style={panelStyle}>
        <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Edge</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-3">
            {edgeData.conditions.map((cond, i) => (
              <div key={cond.id} className="rounded-lg p-3" style={{ border: '1px solid var(--border-default)', backgroundColor: 'var(--bg-surface-secondary)' }}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Condition {i + 1}</span>
                  <button
                    onClick={() => updateEdgeData(selectedEdgeId!, {
                      conditions: edgeData.conditions.filter((c) => c.id !== cond.id),
                    })}
                    className="text-gray-300 hover:text-red-500"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
                <input
                  type="text"
                  value={cond.attribute}
                  onChange={(e) => updateEdgeData(selectedEdgeId!, {
                    conditions: edgeData.conditions.map((c) => c.id === cond.id ? { ...c, attribute: e.target.value } : c),
                  })}
                  placeholder="attribute (e.g. goal)"
                  className="mb-1.5 w-full rounded border px-2 py-1 text-xs outline-none"
                  style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                />
                <select
                  value={cond.operator}
                  onChange={(e) => updateEdgeData(selectedEdgeId!, {
                    conditions: edgeData.conditions.map((c) => c.id === cond.id ? { ...c, operator: e.target.value as 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'nin' | 'contains' } : c),
                  })}
                  className="mb-1.5 w-full rounded border px-2 py-1 text-xs outline-none"
                  style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                >
                  {(['eq','neq','gt','lt','gte','lte','in','nin','contains'] as const).map((op) => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={cond.value}
                  onChange={(e) => updateEdgeData(selectedEdgeId!, {
                    conditions: edgeData.conditions.map((c) => c.id === cond.id ? { ...c, value: e.target.value } : c),
                  })}
                  placeholder="value (e.g. weight_loss)"
                  className="w-full rounded border px-2 py-1 text-xs outline-none"
                  style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                />
              </div>
            ))}
            <button
              onClick={() => updateEdgeData(selectedEdgeId!, {
                conditions: [...edgeData.conditions, { id: crypto.randomUUID(), attribute: '', operator: 'eq', value: '' }],
              })}
              className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add condition
            </button>
          </div>
        </div>
        <DeleteAction label="Delete edge" onClick={() => deleteEdge(selectedEdgeId!)} />
      </div>
    );
  }

  const node = selectedNode!;
  const data = node.data as NodeData;

  return (
    <div className="flex w-72 flex-shrink-0 flex-col" style={panelStyle}>
      <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          {NODE_TYPE_LABELS[node.type ?? 'end']}
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {data.type === 'info' && <InfoNodePanel nodeId={node.id} data={data} />}
        {data.type === 'question' && <QuestionNodePanel nodeId={node.id} data={data} />}
        {data.type === 'offer' && <OfferNodePanel nodeId={node.id} data={data} />}
        {data.type === 'end' && <EndNodePanel />}
      </div>
      <DeleteAction label="Delete node" onClick={() => deleteNode(selectedNodeId!)} />
    </div>
  );
}
