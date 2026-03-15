import { useQuery } from '@tanstack/react-query';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import type { OfferNodeData } from '../../../types';
import { useFlowStore } from '../../../store/flowStore';
import { fetchOffers } from '../../../../offers/api/offersApi';

type OfferNodeType = Node<OfferNodeData, 'offer'>;

export function OfferNode({ id, data, selected }: NodeProps<OfferNodeType>) {
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);
  const offersQuery = useQuery({ queryKey: ['offers'], queryFn: fetchOffers });
  const offer = offersQuery.data?.find((item) => item.id === data.offerId);

  return (
    <div
      onClick={() => setSelectedNodeId(id)}
      className="min-w-[200px] max-w-[260px] cursor-pointer rounded-xl border-2 shadow-sm transition-all"
      style={{
        backgroundColor: 'var(--node-offer-bg)',
        borderColor: selected ? 'var(--node-offer-border-selected)' : 'var(--node-offer-border)',
        boxShadow: selected ? '0 10px 28px rgba(0, 0, 0, 0.22)' : undefined,
      }}
    >
      <div
        className="flex items-center gap-2 border-b px-3 py-2"
        style={{ borderBottomColor: 'var(--node-offer-divider)' }}
      >
        <div
          className="flex h-5 w-5 items-center justify-center rounded"
          style={{ backgroundColor: 'var(--node-offer-icon-bg)', color: 'var(--node-offer-icon-text)' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--node-offer-label)' }}>
          Offer
        </span>
      </div>
      <div className="px-3 py-2">
        {offer ? (
          <>
            <p className="text-sm font-medium" style={{ color: 'var(--node-offer-title)' }}>
              {offer.name}
            </p>
            <p className="mt-1 line-clamp-2 text-xs" style={{ color: 'var(--node-offer-body)' }}>
              {offer.description || offer.why || 'Offer selected'}
            </p>
          </>
        ) : (
          <p className="text-sm italic" style={{ color: 'var(--node-offer-empty)' }}>
            {data.offerId ? 'Offer not found' : 'No offer selected'}
          </p>
        )}
      </div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ borderColor: 'var(--node-offer-handle-border)', backgroundColor: 'var(--node-offer-handle-bg)' }}
      />
    </div>
  );
}
