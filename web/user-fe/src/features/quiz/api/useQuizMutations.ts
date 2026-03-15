import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useQuizStore } from '../store/quizStore';
import { createSession, submitAnswer } from './quizApi';
import type { ProblemDetails, SubmitAnswerInput } from '../types';

function getApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError<ProblemDetails>(error)) {
    return (
      error.response?.data?.detail ??
      error.response?.data?.title ??
      error.message ??
      fallbackMessage
    );
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

export function useCreateSession() {
  const store = useQuizStore();

  return useMutation({
    mutationFn: createSession,
    onSuccess: (data) => {
      store.initSession(data.sessionId, data.node);
    },
    onError: (error) => {
      store.setError(getApiErrorMessage(error, 'Failed to start session. Please try again.'));
    },
  });
}

export function useSubmitAnswer() {
  const store = useQuizStore();

  return useMutation({
    mutationFn: ({ historyAnswer: _historyAnswer, ...body }: SubmitAnswerInput) => {
      if (!store.sessionId) throw new Error('No active session');
      return submitAnswer(store.sessionId, body);
    },
    onMutate: () => {
      store.setSubmitting(true);
      store.setError(null);
    },
    onSuccess: (data, variables) => {
      if (data.completed) {
        if (data.offers && data.offers.length > 0) {
          store.pushOffers(data.offers);
        } else {
          store.setError('Session completed, but no offer was returned.');
        }
      } else if (data.node) {
        store.pushNode(data.node, variables.historyAnswer);
      } else {
        store.setError('No next step was returned by the server.');
      }

      store.setSubmitting(false);
    },
    onError: (error) => {
      store.setError(getApiErrorMessage(error, 'Something went wrong. Please try again.'));
      store.setSubmitting(false);
    },
  });
}
