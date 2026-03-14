import type { Node, Edge } from '@xyflow/react';

export type AnswerType = 'single' | 'multi' | 'input';
export type ConditionOperator = 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'nin' | 'contains';

export interface Condition {
  id: string;
  attribute: string;
  operator: ConditionOperator;
  value: string;
}

export interface AnswerOption {
  id: string;
  label: string;
}

export interface InfoNodeData extends Record<string, unknown> {
  type: 'info';
  title: string;
  body: string;
}

export interface QuestionNodeData extends Record<string, unknown> {
  type: 'question';
  title: string;
  text: string;
  answerType: AnswerType;
  dataAttribute: string;
  options: AnswerOption[];
}

export interface OfferNodeData extends Record<string, unknown> {
  type: 'offer';
  offerId: string;
}

export interface EndNodeData extends Record<string, unknown> {
  type: 'end';
}

export type NodeData = InfoNodeData | QuestionNodeData | OfferNodeData | EndNodeData;

export interface EdgeData extends Record<string, unknown> {
  conditions: Condition[];
  label?: string;
}

export type FlowNode = Node<NodeData>;
export type FlowEdge = Edge<EdgeData>;

export interface FlowSnapshot {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface FlowDraft {
  id: string;
  name: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  updatedAt: string;
  isDirty: boolean;
}
