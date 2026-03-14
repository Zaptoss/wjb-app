import { useFlowStore } from '../../../store/flowStore';
import type { OfferNodeData } from '../../../types';
import { OFFERS } from '../../../../offers/data';

export function OfferNodePanel({ nodeId, data }: { nodeId: string; data: OfferNodeData }) {
  const updateNodeData = useFlowStore((s) => s.updateNodeData);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Select Offer</label>
        <select
          value={data.offerId}
          onChange={(e) => updateNodeData(nodeId, { offerId: e.target.value })}
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-gray-400"
        >
          <option value="">— choose an offer —</option>
          {OFFERS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      </div>
      {data.offerId && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3">
          {OFFERS.filter((o) => o.id === data.offerId).map((o) => (
            <div key={o.id}>
              <p className="text-sm font-semibold text-green-800">{o.name}</p>
              <p className="text-xs text-green-600">{o.tagline}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
