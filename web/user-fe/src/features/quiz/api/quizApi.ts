import { axiosInstance } from '@/shared/lib/axios';
import type {
  AnswerRequest,
  ApiCreateSessionResponse,
  ApiSessionStepResponse,
  CreateSessionResponse,
  NodeDto,
  OfferDto,
  QuestionInputType,
  SessionNode,
  SessionStepResponse,
} from '../types';

function mapNodeType(type?: string | null): SessionNode['type'] {
  switch ((type ?? '').trim().toLowerCase()) {
    case 'info':
    case 'info_page':
      return 'info_page';
    default:
      return 'question';
  }
}

function mapQuestionType(node: NodeDto): QuestionInputType | undefined {
  const normalizedInputType = (node.inputType ?? '').trim().toLowerCase();

  switch (normalizedInputType) {
    case 'multiplechoice':
    case 'multiple_choice':
    case 'multi':
      return 'multi_choice';
    case 'text':
    case 'number':
    case 'input':
      return 'input';
    case 'singlechoice':
    case 'single_choice':
    case 'single':
      return 'single_choice';
    default:
      return mapNodeType(node.type) === 'question' ? 'single_choice' : undefined;
  }
}

function mapTextInputType(inputType?: string | null): SessionNode['inputType'] {
  switch ((inputType ?? '').trim().toLowerCase()) {
    case 'number':
      return 'number';
    case 'text':
    case 'input':
      return 'text';
    default:
      return undefined;
  }
}

function mapNode(node: NodeDto): SessionNode {
  const mappedType = mapNodeType(node.type);

  return {
    id: node.id ?? '',
    type: mappedType,
    title: node.title ?? '',
    description: node.body ?? undefined,
    imageUrl: node.imageUrl ?? undefined,
    attributeKey: node.attributeKey ?? undefined,
    questionType: mappedType === 'question' ? mapQuestionType(node) : undefined,
    inputType: mappedType === 'question' ? mapTextInputType(node.inputType) : undefined,
    options: (node.options ?? [])
      .slice()
      .sort((left, right) => (left.order ?? 0) - (right.order ?? 0))
      .map((option) => ({
        id: option.id ?? option.value ?? option.label ?? '',
        label: option.label ?? option.value ?? '',
        value: option.value ?? '',
        displayOrder: option.order ?? 0,
      })),
  };
}

function mapWellnessKitDetails(details?: string | null) {
  const normalizedDetails = details?.trim() ?? '';
  const lines = normalizedDetails
    .split(/\r?\n|•/g)
    .map((line) => line.trim().replace(/^-+\s*/, ''))
    .filter(Boolean);

  return {
    name: 'Wellness Kit',
    description: normalizedDetails,
    items: lines.length > 1 ? lines : [],
  };
}

function mapOffer(offer: OfferDto) {
  return {
    id: offer.id ?? '',
    name: offer.name ?? '',
    description: offer.description ?? '',
    digitalPlan: offer.digitalPlanDetails ?? '',
    kit: mapWellnessKitDetails(offer.wellnessKitDetails),
    reason: offer.why ?? undefined,
  };
}

function mapCreateSessionResponse(response: ApiCreateSessionResponse): CreateSessionResponse {
  if (!response.sessionId) {
    throw new Error('Session API did not return a session id.');
  }

  if (!response.node) {
    throw new Error('Session API did not return the first node.');
  }

  return {
    sessionId: response.sessionId,
    node: mapNode(response.node),
  };
}

function mapSessionStepResponse(response: ApiSessionStepResponse): SessionStepResponse {
  return {
    completed: Boolean(response.completed),
    node: response.node ? mapNode(response.node) : undefined,
    offers: response.offers?.map(mapOffer) ?? [],
  };
}

export async function createSession(): Promise<CreateSessionResponse> {
  const { data } = await axiosInstance.post<ApiCreateSessionResponse>('/api/sessions');

  return mapCreateSessionResponse(data);
}

export async function submitAnswer(
  sessionId: string,
  body: AnswerRequest,
): Promise<SessionStepResponse> {
  const { data } = await axiosInstance.post<ApiSessionStepResponse>(
    `/api/sessions/${sessionId}/answers`,
    body,
  );

  return mapSessionStepResponse(data);
}
