import { useEffect, useRef, useCallback } from 'react';
import { useFlowStore } from '../store/flowStore';
import { db } from '../db/flowDb';

export function useFlowPersistence(flowId: string) {
  const nodes = useFlowStore((s) => s.nodes);
  const edges = useFlowStore((s) => s.edges);
  const flowName = useFlowStore((s) => s.flowName);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persist = useCallback(() => {
    if (!flowId) return;
    db.flowDrafts.put({
      id: flowId,
      name: flowName,
      nodes,
      edges,
      updatedAt: new Date().toISOString(),
      isDirty: true,
    });
  }, [flowId, flowName, nodes, edges]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(persist, 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [persist]);

  const markClean = useCallback(async () => {
    if (!flowId) return;
    const draft = await db.flowDrafts.get(flowId);
    if (draft) {
      await db.flowDrafts.put({ ...draft, isDirty: false });
    }
  }, [flowId]);

  return { markClean };
}
