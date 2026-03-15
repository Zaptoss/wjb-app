import { useMutation } from '@tanstack/react-query';
import { useQuizStore } from '../store/quizStore';
import { createSession, submitAnswer } from './quizApi';
import type { AnswerRequest } from '../types';

export function useCreateSession() {
  const store = useQuizStore();

  return useMutation({
    mutationFn: createSession,
    onSuccess: (data) => {
      const { sessionId, step } = data;
      if (step.node) {
        store.initSession(sessionId, step.node, step.progress);
      }
    },
    onError: () => {
      store.setError('Failed to start session. Please try again.');
    },
  });
}

export function useSubmitAnswer() {
  const store = useQuizStore();

  return useMutation({
    mutationFn: (body: AnswerRequest) => {
      if (!store.sessionId) throw new Error('No active session');
      return submitAnswer(store.sessionId, body);
    },
    onMutate: () => {
      store.setSubmitting(true);
      store.setError(null);
    },
    onSuccess: (data, variables) => {
      if (data.isOffer && data.offer) {
        store.pushOffer(data.offer);
      } else if (data.node) {
        // Determine the answer that was just submitted
        const answer = variables.answer;
        store.pushNode(data.node, answer, data.progress);
      }
      store.setSubmitting(false);
    },
    onError: () => {
      store.setError('Something went wrong. Please try again.');
      store.setSubmitting(false);
    },
  });
}
