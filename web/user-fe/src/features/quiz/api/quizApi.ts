import { axiosInstance } from '@/shared/lib/axios';
import type {
  AnswerRequest,
  CreateSessionResponse,
  SessionStepResponse,
} from '../types';

export async function createSession(): Promise<CreateSessionResponse> {
  const { data } = await axiosInstance.post<CreateSessionResponse>(
    '/api/sessions',
  );
  return data;
}

export async function submitAnswer(
  sessionId: string,
  body: AnswerRequest,
): Promise<SessionStepResponse> {
  const { data } = await axiosInstance.post<SessionStepResponse>(
    `/api/sessions/${sessionId}/answers`,
    body,
  );
  return data;
}
