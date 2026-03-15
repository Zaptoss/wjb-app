import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NodePalette } from '../features/flows/components/sidebar/NodePalette';
import { PropertyPanel } from '../features/flows/components/sidebar/PropertyPanel';
import { FlowToolbar } from '../features/flows/components/toolbar/FlowToolbar';
import { FlowCanvas } from '../features/flows/components/canvas/FlowCanvas';
import { buildSaveFlowGraphRequest, fetchFlowGraph, mapGraphToDraft, saveFlowGraph } from '../features/flows/api/flowApi';
import { db } from '../features/flows/db/flowDb';
import { useFlowPersistence } from '../features/flows/hooks/useFlowPersistence';
import { useUndoRedo } from '../features/flows/hooks/useUndoRedo';
import { useFlowStore } from '../features/flows/store/flowStore';

export default function FlowEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loadFlow = useFlowStore((state) => state.loadFlow);
  const setFlowId = useFlowStore((state) => state.setFlowId);
  const flowName = useFlowStore((state) => state.flowName);
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const [isDirty, setIsDirty] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);
  const [addNodeAtViewportCenter, setAddNodeAtViewportCenter] = useState<((type: string) => void) | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  useUndoRedo();
  useFlowPersistence(id ?? '', isHydrated);

  const saveMutation = useMutation({
    mutationFn: (request: ReturnType<typeof buildSaveFlowGraphRequest>) => saveFlowGraph(id!, request),
    onSuccess: async (graph) => {
      const cleanDraft = mapGraphToDraft(graph);
      await db.flowDrafts.put(cleanDraft);
      loadFlow(cleanDraft);
      setIsDirty(false);
      await queryClient.invalidateQueries({ queryKey: ['flows'] });
    },
  });

  useEffect(() => {
    if (!id) {
      navigate('/flows', { replace: true });
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const hydrate = async () => {
      setIsLoading(true);
      setHasLoadError(false);

      try {
        const graph = await fetchFlowGraph(id);
        const serverDraft = mapGraphToDraft(graph);
        const localDraft = await db.flowDrafts.get(id);
        const draft = localDraft?.isDirty ? localDraft : serverDraft;

        if (cancelled) return;

        await db.flowDrafts.put(draft);
        loadFlow(draft);
        setFlowId(id);
        setIsDirty(draft.isDirty);
        setIsHydrated(true);
      } catch {
        if (cancelled) return;
        setHasLoadError(true);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    hydrate();

    return () => {
      cancelled = true;
    };
  }, [id, loadFlow, setFlowId]);

  useEffect(() => {
    if (!id || !isHydrated) return;

    const interval = window.setInterval(async () => {
      const draft = await db.flowDrafts.get(id);
      setIsDirty(Boolean(draft?.isDirty));
    }, 400);

    return () => window.clearInterval(interval);
  }, [id, isHydrated]);

  const handleSave = async () => {
    if (!id) return;

    await saveMutation.mutateAsync(buildSaveFlowGraphRequest(flowName, nodes, edges));
  };

  if (hasLoadError) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6" style={{ backgroundColor: 'var(--bg-body)' }}>
        <div className="max-w-md rounded-2xl border p-6 text-center" style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-surface)' }}>
          <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Unable to load flow</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            The editor graph could not be loaded. Try returning to the flows list and opening it again.
          </p>
          <button
            type="button"
            onClick={() => navigate('/flows')}
            className="mt-4 rounded-xl px-4 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            Back to flows
          </button>
        </div>
      </main>
    );
  }

  if (isLoading || !isHydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center" style={{ backgroundColor: 'var(--bg-body)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading flow editor...</p>
      </main>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-body)' }}>
      <NodePalette onQuickAddNode={addNodeAtViewportCenter ?? undefined} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <FlowToolbar isDirty={isDirty || saveMutation.isPending} onSave={handleSave} />
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <FlowCanvas
              reactFlowWrapper={reactFlowWrapper}
              onReady={({ addNodeAtViewportCenter: addNode }) => setAddNodeAtViewportCenter(() => addNode)}
            />
          </div>
          <PropertyPanel />
        </div>
      </div>
    </div>
  );
}
