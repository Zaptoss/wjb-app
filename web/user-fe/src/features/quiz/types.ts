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

// ── UI session API types ────────────────────────────────────────────────────

export interface SessionStepResponse {
  completed: boolean;
  node?: SessionNode;
  offers?: OfferData[];
}

export interface CreateSessionResponse {
  sessionId: string;
  node: SessionNode;
}

export interface AnswerRequest {
  nodeId: string;
  value: string;
}

export interface SubmitAnswerInput extends AnswerRequest {
  historyAnswer: AnswerValue | null;
}

// ── Raw API DTO types ───────────────────────────────────────────────────────

export interface NodeOptionDto {
  id?: string;
  label?: string | null;
  value?: string | null;
  order?: number;
}

export interface NodeDto {
  id?: string;
  type?: string | null;
  title?: string | null;
  body?: string | null;
  inputType?: string | null;
  attributeKey?: string | null;
  imageUrl?: string | null;
  options?: NodeOptionDto[] | null;
}

export interface OfferDto {
  id?: string;
  name?: string | null;
  description?: string | null;
  digitalPlanDetails?: string | null;
  wellnessKitDetails?: string | null;
  why?: string | null;
}

export interface ApiCreateSessionResponse {
  sessionId?: string;
  node?: NodeDto | null;
}

export interface ApiSessionStepResponse {
  completed?: boolean;
  node?: NodeDto | null;
  offers?: OfferDto[] | null;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
}
