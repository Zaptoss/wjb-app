import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps, type Edge } from '@xyflow/react';
import type { EdgeData } from '../../../types';

type ConditionEdgeType = Edge<EdgeData, 'condition'>;

export function ConditionEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}: EdgeProps<ConditionEdgeType>) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const hasConditions = (data?.conditions?.length ?? 0) > 0;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: selected ? 'var(--edge-selected)' : 'var(--edge-default)', strokeWidth: selected ? 2 : 1.5 }}
        markerEnd="url(#arrowhead)"
      />
      {hasConditions && (
        <EdgeLabelRenderer>
          <div
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              backgroundColor: 'var(--edge-badge-bg)',
              color: 'var(--edge-badge-text)',
              border: '1px solid var(--edge-badge-border)',
            }}
            className="pointer-events-none absolute rounded-full px-2 py-0.5 text-[10px] font-medium shadow-sm"
          >
            {data!.conditions.length} condition{data!.conditions.length > 1 ? 's' : ''}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
