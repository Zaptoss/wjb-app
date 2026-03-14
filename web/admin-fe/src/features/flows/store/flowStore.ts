import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges, addEdge as rfAddEdge } from '@xyflow/react';
import type { NodeChange, EdgeChange, Connection } from '@xyflow/react';
import type { FlowNode, FlowEdge, NodeData, EdgeData, FlowSnapshot, FlowDraft } from '../types';

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

interface FlowState {
  flowId: string;
  flowName: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  past: FlowSnapshot[];
  future: FlowSnapshot[];
  clipboardFlow: { nodes: FlowNode[]; edges: FlowEdge[] } | null;

  setFlowId: (id: string) => void;
  setFlowName: (name: string) => void;
  onNodesChange: (changes: NodeChange<FlowNode>[]) => void;
  onEdgesChange: (changes: EdgeChange<FlowEdge>[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: FlowNode) => void;
  setNodePosition: (id: string, position: { x: number; y: number }) => void;
  deleteNode: (id: string) => void;
  deleteNodes: (ids: string[]) => void;
  clearFlow: () => void;
  updateNodeData: (id: string, patch: Partial<NodeData>) => void;
  deleteEdge: (id: string) => void;
  updateEdgeData: (id: string, patch: Partial<EdgeData>) => void;
  setSelectedNodeId: (id: string | null) => void;
  setSelectedEdgeId: (id: string | null) => void;
  undo: () => void;
  redo: () => void;
  loadFlow: (draft: FlowDraft) => void;
  resetFlow: () => void;
  copyFlow: () => void;
  copySelected: (ids: string[]) => void;
  pasteFlow: (position?: { x: number; y: number }) => void;
  duplicateNode: (id: string) => void;
  duplicateNodeFromDrag: (
    id: string,
    sourcePosition: { x: number; y: number },
    duplicatePosition: { x: number; y: number }
  ) => void;
}

function pushHistory(state: FlowState): Partial<FlowState> {
  const snapshot: FlowSnapshot = deepClone({ nodes: state.nodes, edges: state.edges });
  return {
    past: [...state.past.slice(-49), snapshot],
    future: [],
  };
}

export const useFlowStore = create<FlowState>((set, get) => ({
  flowId: '',
  flowName: 'Untitled Flow',
  nodes: [],
  edges: [],
  selectedNodeId: null,
  selectedEdgeId: null,
  past: [],
  future: [],
  clipboardFlow: null,

  setFlowId: (id) => set({ flowId: id }),
  setFlowName: (name) => set({ flowName: name }),

  onNodesChange: (changes) =>
    set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) })),

  onEdgesChange: (changes) =>
    set((state) => ({ edges: applyEdgeChanges(changes, state.edges) })),

  onConnect: (connection) =>
    set((state) => {
      if (!connection.source || !connection.target) return {};
      if (connection.source === connection.target) return {};

      return {
        ...pushHistory(state),
        edges: rfAddEdge(
          { ...connection, data: { conditions: [], label: '' } },
          state.edges
        ) as FlowEdge[],
      };
    }),

  addNode: (node) =>
    set((state) => ({
      ...pushHistory(state),
      nodes: [...state.nodes, node],
    })),

  setNodePosition: (id, position) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, position } : node
      ),
    })),

  deleteNode: (id) =>
    set((state) => ({
      ...pushHistory(state),
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
      selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
    })),

  deleteNodes: (ids) =>
    set((state) => {
      if (ids.length === 0) return {};
      const idSet = new Set(ids);

      return {
        ...pushHistory(state),
        nodes: state.nodes.filter((n) => !idSet.has(n.id)),
        edges: state.edges.filter((e) => !idSet.has(e.source) && !idSet.has(e.target)),
        selectedNodeId:
          state.selectedNodeId && idSet.has(state.selectedNodeId)
            ? null
            : state.selectedNodeId,
      };
    }),

  clearFlow: () =>
    set((state) => {
      if (state.nodes.length === 0 && state.edges.length === 0) return {};
      return {
        ...pushHistory(state),
        nodes: [],
        edges: [],
        selectedNodeId: null,
        selectedEdgeId: null,
      };
    }),

  updateNodeData: (id, patch) =>
    set((state) => ({
      ...pushHistory(state),
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...patch } as NodeData } : n
      ),
    })),

  deleteEdge: (id) =>
    set((state) => ({
      ...pushHistory(state),
      edges: state.edges.filter((e) => e.id !== id),
      selectedEdgeId: state.selectedEdgeId === id ? null : state.selectedEdgeId,
    })),

  updateEdgeData: (id, patch) =>
    set((state) => ({
      edges: state.edges.map((e) =>
        e.id === id ? { ...e, data: { ...e.data, ...patch } as EdgeData } : e
      ),
    })),

  setSelectedNodeId: (id) => set({ selectedNodeId: id, selectedEdgeId: null }),
  setSelectedEdgeId: (id) => set({ selectedEdgeId: id, selectedNodeId: null }),

  undo: () =>
    set((state) => {
      if (state.past.length === 0) return {};
      const previous = state.past[state.past.length - 1]!;
      const newPast = state.past.slice(0, -1);
      const currentSnapshot: FlowSnapshot = deepClone({ nodes: state.nodes, edges: state.edges });
      return {
        past: newPast,
        future: [currentSnapshot, ...state.future],
        nodes: previous.nodes,
        edges: previous.edges,
      };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return {};
      const next = state.future[0]!;
      const newFuture = state.future.slice(1);
      const currentSnapshot: FlowSnapshot = deepClone({ nodes: state.nodes, edges: state.edges });
      return {
        past: [...state.past, currentSnapshot],
        future: newFuture,
        nodes: next.nodes,
        edges: next.edges,
      };
    }),

  loadFlow: (draft) =>
    set({
      flowId: draft.id,
      flowName: draft.name,
      nodes: draft.nodes,
      edges: draft.edges,
      past: [],
      future: [],
      selectedNodeId: null,
      selectedEdgeId: null,
    }),

  resetFlow: () =>
    set({
      flowId: '',
      flowName: 'Untitled Flow',
      nodes: [],
      edges: [],
      past: [],
      future: [],
      selectedNodeId: null,
      selectedEdgeId: null,
    }),

  copyFlow: () =>
    set((state) => ({
      clipboardFlow: deepClone({ nodes: state.nodes, edges: state.edges }),
    })),

  copySelected: (ids) =>
    set((state) => {
      if (!ids.length) return {};
      const idSet = new Set(ids);
      const selectedNodes = state.nodes.filter((node) => idSet.has(node.id));
      if (!selectedNodes.length) return {};

      const selectedEdges = state.edges.filter(
        (edge) => idSet.has(edge.source) && idSet.has(edge.target)
      );

      return {
        clipboardFlow: deepClone({ nodes: selectedNodes, edges: selectedEdges }),
      };
    }),

  pasteFlow: (position) =>
    set((state) => {
      const clipboard = state.clipboardFlow;
      if (!clipboard || clipboard.nodes.length === 0) return {};

      const idMap = new Map<string, string>();
      clipboard.nodes.forEach((node) => {
        idMap.set(node.id, crypto.randomUUID());
      });

      const minX = Math.min(...clipboard.nodes.map((node) => node.position.x));
      const minY = Math.min(...clipboard.nodes.map((node) => node.position.y));
      const defaultPosition = { x: minX + 80, y: minY + 80 };
      const anchor = position ?? defaultPosition;

      const nextNodes: FlowNode[] = clipboard.nodes.map((node) => {
        const nextId = idMap.get(node.id)!;
        return {
          ...deepClone(node),
          id: nextId,
          position: {
            x: anchor.x + (node.position.x - minX),
            y: anchor.y + (node.position.y - minY),
          },
          selected: true,
        };
      });

      const nextEdges: FlowEdge[] = clipboard.edges
        .map((edge) => {
          const source = idMap.get(edge.source);
          const target = idMap.get(edge.target);
          if (!source || !target) return null;

          return {
            ...deepClone(edge),
            id: crypto.randomUUID(),
            source,
            target,
            selected: true,
          } as FlowEdge;
        })
        .filter((edge): edge is FlowEdge => edge !== null);

      const currentNodes = state.nodes.map((node) => ({ ...node, selected: false }));
      const currentEdges = state.edges.map((edge) => ({ ...edge, selected: false }));

      return {
        ...pushHistory(state),
        nodes: [...currentNodes, ...nextNodes],
        edges: [...currentEdges, ...nextEdges],
        selectedNodeId: null,
        selectedEdgeId: null,
      };
    }),

  duplicateNode: (id) => {
    const state = get();
    const node = state.nodes.find((n) => n.id === id);
    if (!node) return;
    const newNode: FlowNode = {
      ...deepClone(node),
      id: crypto.randomUUID(),
      position: { x: node.position.x + 40, y: node.position.y + 40 },
      selected: false,
    };
    set((s) => ({
      ...pushHistory(s),
      nodes: [...s.nodes, newNode],
    }));
  },

  duplicateNodeFromDrag: (id, sourcePosition, duplicatePosition) =>
    set((state) => {
      const node = state.nodes.find((n) => n.id === id);
      if (!node) return {};

      const newNode: FlowNode = {
        ...deepClone(node),
        id: crypto.randomUUID(),
        position: duplicatePosition,
        selected: false,
      };

      return {
        ...pushHistory(state),
        nodes: [
          ...state.nodes.map((n) =>
            n.id === id ? { ...n, position: sourcePosition } : n
          ),
          newNode,
        ],
        selectedNodeId: newNode.id,
        selectedEdgeId: null,
      };
    }),
}));
