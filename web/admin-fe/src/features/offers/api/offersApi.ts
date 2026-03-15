import { axiosInstance } from '@/shared/lib/axios';

export interface OfferRecord {
  id: string;
  name: string;
  description: string;
  digitalPlanDetails: string;
  wellnessKitDetails: string;
  why: string;
  updatedAt: string;
}

interface SaveOfferRequest {
  name: string;
  description: string;
  digitalPlanDetails: string;
  wellnessKitDetails: string;
  why: string;
}

export async function fetchOffers() {
  const { data } = await axiosInstance.get<OfferRecord[]>('/api/admin/offers');
  return data;
}

export async function createOffer(request: SaveOfferRequest) {
  const { data } = await axiosInstance.post<OfferRecord>('/api/admin/offers', request);
  return data;
}

export async function updateOffer(id: string, request: SaveOfferRequest) {
  const { data } = await axiosInstance.put<OfferRecord>(`/api/admin/offers/${id}`, request);
  return data;
}

export async function deleteOffer(id: string) {
  await axiosInstance.delete(`/api/admin/offers/${id}`);
}
