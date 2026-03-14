import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../features/flows/db/flowDb';
import type { FlowDraft } from '../features/flows/types';

export default function FlowListPage() {
  const [flows, setFlows] = useState<FlowDraft[]>([]);
  const navigate = useNavigate();

  const loadFlows = async () => {
    const all = await db.flowDrafts.orderBy('updatedAt').reverse().toArray();
    setFlows(all);
  };

  useEffect(() => {
    loadFlows();
  }, []);

  const createFlow = async () => {
    const id = crypto.randomUUID();
    await db.flowDrafts.put({
      id,
      name: 'Untitled Flow',
      nodes: [],
      edges: [],
      updatedAt: new Date().toISOString(),
      isDirty: false,
    });
    navigate(`/flows/${id}`);
  };

  const deleteFlow = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await db.flowDrafts.delete(id);
    loadFlows();
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Flow Builder</h1>
            <p className="mt-1 text-sm text-gray-500">Create and manage wellness quiz flows</p>
          </div>
          <button
            onClick={createFlow}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Flow
          </button>
        </div>

        {/* Flow list */}
        {flows.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white py-20">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
              </svg>
            </div>
            <p className="text-base font-medium text-gray-500">No flows yet</p>
            <p className="mt-1 text-sm text-gray-400">Create your first wellness quiz flow</p>
            <button
              onClick={createFlow}
              className="mt-6 flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Create flow
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {flows.map((flow) => (
              <div
                key={flow.id}
                onClick={() => navigate(`/flows/${flow.id}`)}
                className="group relative cursor-pointer rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    </svg>
                  </div>
                  <button
                    onClick={(e) => deleteFlow(e, flow.id)}
                    className="opacity-0 text-gray-300 transition-opacity hover:text-red-500 group-hover:opacity-100"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                  </button>
                </div>
                <h3 className="mb-1 font-semibold text-gray-900">{flow.name}</h3>
                <p className="text-xs text-gray-400">{flow.nodes.length} nodes · {flow.edges.length} edges</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{formatDate(flow.updatedAt)}</span>
                  {flow.isDirty && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                      Unsaved
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
