// ── Node types ──────────────────────────────────────────────────────────────

export type NodeType = 'question' | 'info_page';
export type QuestionInputType = 'single_choice' | 'multi_choice' | 'input';

export interface NodeOption {
  id: string;
  label: string;
  value: string;
  description?: string;
  imageUrl?: string;
  icon?: string;
  displayOrder: number;
}

export interface SessionNode {
  id: string;
  type: NodeType;
  title: string;
  description?: string;
  imageUrl?: string;
  questionType?: QuestionInputType;
  attributeKey?: string;
  options?: NodeOption[];
  inputPlaceholder?: string;
  inputType?: 'text' | 'number';
}

// ── Offer ───────────────────────────────────────────────────────────────────

export interface OfferKit {
  name: string;
  description: string;
  items: string[];
  imageUrl?: string;
}

export interface OfferData {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  digitalPlan: string;
  kit: OfferKit;
  ctaUrl?: string;
  ctaLabel?: string;
  reason?: string;
}

// ── Answer values ───────────────────────────────────────────────────────────

export type AnswerValue =
  | { type: 'single_choice'; optionId: string }
  | { type: 'multi_choice'; optionIds: string[] }
  | { type: 'input'; value: string };

// ── History ─────────────────────────────────────────────────────────────────

export interface HistoryEntry {
  nodeId: string;
  node: SessionNode;
  answer: AnswerValue | null; // null for info pages
}

// ── API types ───────────────────────────────────────────────────────────────

export interface SessionStepResponse {
  isOffer: boolean;
  node?: SessionNode;
  offer?: OfferData;
  offers?: OfferData[];
  progress?: number;
}

export interface CreateSessionResponse {
  sessionId: string;
  step: SessionStepResponse;
}

export interface AnswerRequest {
  nodeId: string;
  answer: AnswerValue;
}
