// import { axiosInstance } from '@/shared/lib/axios';
import type {
  AnswerRequest,
  CreateSessionResponse,
  SessionStepResponse,
} from '../types';
import { MOCK_NODES, MOCK_OFFERS } from './mockData';

// ── Mock state ──────────────────────────────────────────────────────────────
let mockStepIndex = 0;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ── Mock API ────────────────────────────────────────────────────────────────

export async function createSession(): Promise<CreateSessionResponse> {
  await delay(600);
  mockStepIndex = 0;
  const firstNode = MOCK_NODES[0]!;
  return {
    sessionId: 'mock-session-' + Date.now(),
    step: {
      isOffer: false,
      node: firstNode,
      progress: 0,
    },
  };
}

export async function submitAnswer(
  _sessionId: string,
  _body: AnswerRequest,
): Promise<SessionStepResponse> {
  await delay(400);
  mockStepIndex++;

  if (mockStepIndex >= MOCK_NODES.length) {
    return {
      isOffer: true,
      offers: MOCK_OFFERS,
      progress: 1,
    };
  }

  const nextNode = MOCK_NODES[mockStepIndex]!;
  return {
    isOffer: false,
    node: nextNode,
    progress: mockStepIndex / MOCK_NODES.length,
  };
}

// ── Real API (uncomment when backend is ready) ──────────────────────────────
// export async function createSession(): Promise<CreateSessionResponse> {
//   const { data } = await axiosInstance.post<CreateSessionResponse>(
//     '/api/sessions',
//   );
//   return data;
// }
//
// export async function submitAnswer(
//   sessionId: string,
//   body: AnswerRequest,
// ): Promise<SessionStepResponse> {
//   const { data } = await axiosInstance.post<SessionStepResponse>(
//     `/api/sessions/${sessionId}/answers`,
//     body,
//   );
//   return data;
// }
