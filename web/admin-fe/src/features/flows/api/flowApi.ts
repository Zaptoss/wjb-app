import { axiosInstance } from '@/shared/lib/axios';
import type {
  FlowDraft,
  FlowEdge,
  FlowNode,
  ConditionOperator,
  AnswerType,
  InfoNodeData,
  OfferNodeData,
  QuestionNodeData,
} from '../types';

export interface FlowSummary {
  id: string;
  title: string;
  description?: string | null;
  isActive: boolean;
  updatedAt: string;
}

interface GraphNodeOptionResponse {
  id: string;
  label: string;
  value: string;
  order: number;
}

interface GraphConditionResponse {
  id: string;
  attributeKey: string;
  operator: string;
  value: string;
}

interface FlowGraphNodeResponse {
  id: string;
  type: string;
  title: string;
  body?: string | null;
  inputType?: string | null;
  attributeKey?: string | null;
  imageUrl?: string | null;
  offerId?: string | null;
  positionX: number;
  positionY: number;
  options: GraphNodeOptionResponse[];
}

interface FlowGraphEdgeResponse {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  priority: number;
  conditions: GraphConditionResponse[];
}

export interface FlowGraphResponse {
  id: string;
  title: string;
  description?: string | null;
  isActive: boolean;
  updatedAt: string;
  nodes: FlowGraphNodeResponse[];
  edges: FlowGraphEdgeResponse[];
}

interface SaveNodeOptionRequest {
  label: string;
  value: string;
  displayOrder: number;
}

interface SaveFlowGraphNodeRequest {
  id: string;
  type: string;
  title: string;
  body?: string;
  inputType?: string;
  attributeKey?: string;
  imageUrl?: string;
  offerId?: string;
  positionX: number;
  positionY: number;
  options: SaveNodeOptionRequest[];
}

interface SaveFlowGraphConditionRequest {
  id: string;
  attributeKey: string;
  operator: string;
  value: string;
}

interface SaveFlowGraphEdgeRequest {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  conditions: SaveFlowGraphConditionRequest[];
}

export interface SaveFlowGraphRequest {
  title: string;
  description?: string;
  nodes: SaveFlowGraphNodeRequest[];
  edges: SaveFlowGraphEdgeRequest[];
}

export async function fetchFlows() {
  const { data } = await axiosInstance.get<FlowSummary[]>('/api/admin/flows');
  return data;
}

export async function createFlow(title: string) {
  const { data } = await axiosInstance.post<FlowSummary>('/api/admin/flows', {
    title,
    description: '',
  });
  return data;
}

export async function fetchFlowGraph(id: string) {
  const { data } = await axiosInstance.get<FlowGraphResponse>(`/api/admin/flows/${id}/graph`);
  return data;
}

export async function saveFlowGraph(id: string, request: SaveFlowGraphRequest) {
  const { data } = await axiosInstance.put<FlowGraphResponse>(`/api/admin/flows/${id}/graph`, request);
  return data;
}

export async function activateFlow(id: string) {
  await axiosInstance.post(`/api/admin/flows/${id}/activate`);
}

export async function deactivateFlow(id: string) {
  await axiosInstance.post(`/api/admin/flows/${id}/deactivate`);
}

export async function removeFlow(id: string) {
  await axiosInstance.delete(`/api/admin/flows/${id}`);
}

function mapInputTypeToAnswerType(inputType?: string | null): AnswerType {
  switch ((inputType ?? '').toLowerCase()) {
    case 'multiplechoice':
    case 'multiple_choice':
    case 'multi':
      return 'multi';
    case 'text':
    case 'number':
    case 'input':
      return 'input';
    default:
      return 'single';
  }
}

function mapOperatorFromApi(operator: string): ConditionOperator {
  switch (operator.toLowerCase()) {
    case 'noteq':
    case 'neq':
      return 'neq';
    case 'gte':
      return 'gte';
    case 'lte':
      return 'lte';
    case 'nin':
      return 'nin';
    case 'contains':
      return 'contains';
    case 'gt':
      return 'gt';
    case 'lt':
      return 'lt';
    case 'in':
      return 'in';
    default:
      return 'eq';
  }
}

function mapOperatorToApi(operator: ConditionOperator) {
  switch (operator) {
    case 'neq':
      return 'NotEq';
    case 'gte':
      return 'Gte';
    case 'lte':
      return 'Lte';
    case 'nin':
      return 'Nin';
    case 'contains':
      return 'Contains';
    case 'gt':
      return 'Gt';
    case 'lt':
      return 'Lt';
    case 'in':
      return 'In';
    default:
      return 'Eq';
  }
}

function mapAnswerTypeToInputType(answerType: AnswerType) {
  switch (answerType) {
    case 'multi':
      return 'MultipleChoice';
    case 'input':
      return 'Text';
    default:
      return 'SingleChoice';
  }
}

function ensureGuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
    ? value
    : crypto.randomUUID();
}

export function mapGraphToDraft(graph: FlowGraphResponse): FlowDraft {
  const nodes: FlowNode[] = graph.nodes.map((node) => {
    if (node.type === 'question') {
      return {
        id: node.id,
        type: 'question',
        position: { x: node.positionX, y: node.positionY },
        data: {
          type: 'question',
          title: node.title,
          text: node.body ?? '',
          answerType: mapInputTypeToAnswerType(node.inputType),
          dataAttribute: node.attributeKey ?? '',
          imageUrl: node.imageUrl ?? '',
          options: node.options.map((option) => ({
            id: option.id ?? crypto.randomUUID(),
            label: option.label,
          })),
        },
      };
    }

    if (node.type === 'offer') {
      return {
        id: node.id,
        type: 'offer',
        position: { x: node.positionX, y: node.positionY },
        data: {
          type: 'offer',
          offerId: node.offerId ?? '',
        },
      };
    }

    return {
      id: node.id,
      type: 'info',
      position: { x: node.positionX, y: node.positionY },
      data: {
        type: 'info',
        title: node.title,
        body: node.body ?? '',
        imageUrl: node.imageUrl ?? '',
      },
    };
  });

  const edges: FlowEdge[] = graph.edges.map((edge) => ({
    id: edge.id,
    source: edge.sourceNodeId,
    target: edge.targetNodeId,
    type: 'condition',
    data: {
      label: '',
      conditions: edge.conditions.map((condition) => ({
        id: condition.id,
        attribute: condition.attributeKey,
        operator: mapOperatorFromApi(condition.operator),
        value: condition.value,
      })),
    },
  }));

  return {
    id: graph.id,
    name: graph.title,
    nodes,
    edges,
    updatedAt: graph.updatedAt,
    isDirty: false,
    isActive: graph.isActive,
  };
}

export function buildSaveFlowGraphRequest(flowName: string, nodes: FlowNode[], edges: FlowEdge[]): SaveFlowGraphRequest {
  return {
    title: flowName.trim() || 'Untitled Flow',
    description: '',
    nodes: nodes.map((node) => {
      if (node.data.type === 'question') {
        const data = node.data as QuestionNodeData;
        return {
          id: ensureGuid(node.id),
          type: 'question',
          title: data.title.trim() || 'Untitled Question',
          body: data.text.trim(),
          inputType: mapAnswerTypeToInputType(data.answerType),
          attributeKey: data.dataAttribute.trim(),
          imageUrl: data.imageUrl?.trim() || '',
          positionX: node.position.x,
          positionY: node.position.y,
          options: data.options.map((option, index) => ({
            label: option.label.trim(),
            value: option.label.trim() || `option-${index + 1}`,
            displayOrder: index,
          })),
        };
      }

      if (node.data.type === 'offer') {
        const data = node.data as OfferNodeData;
        return {
          id: ensureGuid(node.id),
          type: 'offer',
          title: 'Offer',
          body: '',
          positionX: node.position.x,
          positionY: node.position.y,
          offerId: data.offerId || undefined,
          options: [],
        };
      }

      const data = node.data as InfoNodeData;
      return {
        id: ensureGuid(node.id),
        type: 'info',
        title: data.title.trim() || 'Untitled Info',
        body: data.body.trim(),
        imageUrl: data.imageUrl?.trim() || '',
        positionX: node.position.x,
        positionY: node.position.y,
        options: [],
      };
    }),
    edges: edges.map((edge) => ({
      id: ensureGuid(edge.id),
      sourceNodeId: edge.source,
      targetNodeId: edge.target,
      conditions: (edge.data?.conditions ?? []).map((condition) => ({
        id: ensureGuid(condition.id),
        attributeKey: condition.attribute.trim(),
        operator: mapOperatorToApi(condition.operator),
        value: condition.value.trim(),
      })),
    })),
  };
}
