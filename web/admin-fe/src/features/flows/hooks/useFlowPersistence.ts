import { useEffect, useRef, useCallback } from 'react';
import { useFlowStore } from '../store/flowStore';
import { db } from '../db/flowDb';

export function useFlowPersistence(flowId: string, enabled = true) {
  const nodes = useFlowStore((s) => s.nodes);
  const edges = useFlowStore((s) => s.edges);
  const flowName = useFlowStore((s) => s.flowName);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persist = useCallback(async () => {
    if (!flowId || !enabled) return;
    const existing = await db.flowDrafts.get(flowId);
    const nextSnapshot = JSON.stringify({ name: flowName, nodes, edges });
    const storedSnapshot = existing
      ? JSON.stringify({ name: existing.name, nodes: existing.nodes, edges: existing.edges })
      : null;

    if (existing && nextSnapshot === storedSnapshot) {
      return;
    }

    await db.flowDrafts.put({
      id: flowId,
      name: flowName,
      nodes,
      edges,
      updatedAt: existing?.updatedAt ?? new Date().toISOString(),
      isDirty: true,
      isActive: existing?.isActive ?? false,
    });
  }, [enabled, flowId, flowName, nodes, edges]);

  useEffect(() => {
    if (!enabled) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(persist, 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [enabled, persist]);

  const markClean = useCallback(async () => {
    if (!flowId) return;
    const draft = await db.flowDrafts.get(flowId);
    if (draft) {
      await db.flowDrafts.put({ ...draft, isDirty: false });
    }
  }, [flowId]);

  return { markClean };
}
