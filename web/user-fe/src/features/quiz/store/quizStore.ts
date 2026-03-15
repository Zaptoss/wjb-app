import { create } from 'zustand';
import type { AnswerValue, HistoryEntry, OfferData, SessionNode } from '../types';

function getDerivedProgress(currentIndex: number, historyLength: number) {
  if (historyLength <= 1 || currentIndex <= 0) {
    return 0;
  }

  return currentIndex / historyLength;
}

interface QuizState {
  sessionId: string | null;
  currentNode: SessionNode | null;
  history: HistoryEntry[];
  currentIndex: number;
  isOffer: boolean;
  offers: OfferData[];
  progress: number;
  isSubmitting: boolean;
  error: string | null;
  direction: 'forward' | 'back';
}

interface QuizActions {
  initSession: (sessionId: string, firstNode: SessionNode, progress?: number) => void;
  pushNode: (node: SessionNode, answer: AnswerValue | null, progress?: number) => void;
  pushOffers: (offers: OfferData[]) => void;
  goBack: () => void;
  getCurrentAnswer: () => AnswerValue | null;
  isAtEdge: () => boolean;
  truncateFromCurrent: () => void;
  setSubmitting: (v: boolean) => void;
  setError: (e: string | null) => void;
  reset: () => void;
}

export type QuizStore = QuizState & QuizActions;

export const useQuizStore = create<QuizStore>((set, get) => ({
  // State
  sessionId: null,
  currentNode: null,
  history: [],
  currentIndex: -1,
  isOffer: false,
  offers: [],
  progress: 0,
  isSubmitting: false,
  error: null,
  direction: 'forward',

  // Actions
  initSession: (sessionId, firstNode, progress) => {
    const entry: HistoryEntry = { nodeId: firstNode.id, node: firstNode, answer: null };
    set({
      sessionId,
      currentNode: firstNode,
      history: [entry],
      currentIndex: 0,
      isOffer: false,
      offers: [],
      progress: progress ?? 0,
      error: null,
      direction: 'forward',
    });
  },

  pushNode: (node, answer, progress) => {
    const state = get();
    const history = [...state.history];

    // Record the answer on the current entry before advancing
    const cur = history[state.currentIndex];
    if (state.currentIndex >= 0 && cur) {
      history[state.currentIndex] = { ...cur, answer };
    }

    // Add new entry for the next node
    const newEntry: HistoryEntry = { nodeId: node.id, node, answer: null };
    history.push(newEntry);

    set({
      history,
      currentNode: node,
      currentIndex: history.length - 1,
      isOffer: false,
      offers: [],
      progress: progress ?? getDerivedProgress(history.length - 1, history.length),
      error: null,
      direction: 'forward',
    });
  },

  pushOffers: (offers) => {
    const state = get();
    set({
      isOffer: true,
      offers,
      progress: 1,
      currentNode: null,
      error: null,
      direction: 'forward',
      currentIndex: state.history.length - 1,
    });
  },

  goBack: () => {
    const state = get();

    if (state.isOffer) {
      // Going back from offer page → show last question
      const lastIdx = state.history.length - 1;
      const lastEntry = state.history[lastIdx];
      if (lastIdx >= 0 && lastEntry) {
        set({
          isOffer: false,
          offers: [],
          currentNode: lastEntry.node,
          currentIndex: lastIdx,
          direction: 'back',
          progress: getDerivedProgress(lastIdx, state.history.length),
        });
      }
      return;
    }

    if (state.currentIndex > 0) {
      const newIndex = state.currentIndex - 1;
      const entry = state.history[newIndex];
      if (entry) {
        set({
          currentIndex: newIndex,
          currentNode: entry.node,
          direction: 'back',
          progress: getDerivedProgress(newIndex, state.history.length),
        });
      }
    }
  },

  getCurrentAnswer: () => {
    const state = get();
    const entry = state.history[state.currentIndex];
    if (state.currentIndex >= 0 && entry) {
      return entry.answer;
    }
    return null;
  },

  isAtEdge: () => {
    const state = get();
    return state.currentIndex === state.history.length - 1;
  },

  truncateFromCurrent: () => {
    const state = get();
    // Remove everything after currentIndex
    const history = state.history.slice(0, state.currentIndex + 1);
    set({ history, isOffer: false, offers: [] });
  },

  setSubmitting: (v) => set({ isSubmitting: v }),
  setError: (e) => set({ error: e }),

  reset: () =>
    set({
      sessionId: null,
      currentNode: null,
      history: [],
      currentIndex: -1,
      isOffer: false,
      offers: [],
      progress: 0,
      isSubmitting: false,
      error: null,
      direction: 'forward',
    }),
}));
