import type { NodeTypes } from '@xyflow/react';
import { InfoNode } from './InfoNode';
import { QuestionNode } from './QuestionNode';
import { OfferNode } from './OfferNode';
import { EndNode } from './EndNode';

export const nodeTypes: NodeTypes = {
  info: InfoNode as any,
  question: QuestionNode as any,
  offer: OfferNode as any,
  end: EndNode as any,
};
