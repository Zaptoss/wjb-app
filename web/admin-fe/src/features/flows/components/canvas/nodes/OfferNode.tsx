import { useStoredOffers } from '../../../../offers/storage';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import type { OfferNodeData } from '../../../types';
import { useFlowStore } from '../../../store/flowStore';

type OfferNodeType = Node<OfferNodeData, 'offer'>;

export function OfferNode({ id, data, selected }: NodeProps<OfferNodeType>) {
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);
  const offers = useStoredOffers();
  const offer = offers.find((item) => item.id === data.offerId);

  return (
    <div
      onClick={() => setSelectedNodeId(id)}
      className={`min-w-[200px] max-w-[260px] rounded-xl border-2 bg-green-50 ${selected ? 'border-green-500 shadow-lg' : 'border-green-200'} cursor-pointer shadow-sm transition-all`}
    >
      <div className="flex items-center gap-2 border-b border-green-200 px-3 py-2">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-green-200 text-green-700">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-green-700">Offer</span>
      </div>
      <div className="px-3 py-2">
        {offer ? (
          <>
            <p className="text-sm font-medium text-gray-800">{offer.name}</p>
            <p className="mt-1 line-clamp-2 text-xs text-gray-500">
              {offer.description || offer.why || 'Offer selected'}
            </p>
          </>
        ) : (
          <p className="text-sm italic text-gray-400">
            {data.offerId ? 'Offer not found' : 'No offer selected'}
          </p>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="!border-green-400 !bg-green-100" />
    </div>
  );
}
