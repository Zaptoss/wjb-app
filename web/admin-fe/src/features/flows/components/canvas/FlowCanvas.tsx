import { useCallback, useRef, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  ViewportPortal,
  useOnViewportChange,
  type NodeChange,
  type NodeMouseHandler,
  type OnNodeDrag,
  type EdgeMouseHandler,
  type IsValidConnection,
  type Viewport,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useFlowStore } from '../../store/flowStore';
import { nodeTypes } from './nodes';
import { edgeTypes } from './edges';
import { ContextMenu, type ContextMenuTarget } from './ContextMenu';
import type { FlowNode, FlowEdge } from '../../types';

interface Props {
  reactFlowWrapper: React.RefObject<HTMLDivElement>;
}

function ZoomAwareBackground() {
  const [zoom, setZoom] = useState(1);

  useOnViewportChange({
    onChange: useCallback((viewport: Viewport) => {
      setZoom(viewport.zoom);
    }, []),
  });

  const dotSize = Math.max(1.2, 2.5 * zoom);

  return (
    <Background
      variant={BackgroundVariant.Dots}
      gap={20}
      size={dotSize}
      color="var(--canvas-dot)"
      style={{ backgroundColor: 'var(--canvas-bg)' }}
    />
  );
}

export function FlowCanvas({ reactFlowWrapper }: Props) {
  const nodes = useFlowStore((s) => s.nodes);
  const edges = useFlowStore((s) => s.edges);
  const storeOnNodesChange = useFlowStore((s) => s.onNodesChange);
  const onEdgesChange = useFlowStore((s) => s.onEdgesChange);
  const onConnect = useFlowStore((s) => s.onConnect);
  const addNode = useFlowStore((s) => s.addNode);
  const pasteFlow = useFlowStore((s) => s.pasteFlow);
  const setNodePosition = useFlowStore((s) => s.setNodePosition);
  const setNodesPositions = useFlowStore((s) => s.setNodesPositions);
  const duplicateSelectionFromDrag = useFlowStore((s) => s.duplicateSelectionFromDrag);
  const duplicateNodeFromDrag = useFlowStore((s) => s.duplicateNodeFromDrag);
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);
  const setSelectedEdgeId = useFlowStore((s) => s.setSelectedEdgeId);

  const [contextMenu, setContextMenu] = useState<{
    target: ContextMenuTarget;
    mousePos: { x: number; y: number };
  } | null>(null);

  const [rfInstance, setRfInstance] = useState<ReturnType<typeof useFlowStore> | null>(null);
  const [dragPreview, setDragPreview] = useState<
    Array<{
      id: string;
      position: { x: number; y: number };
      width: number;
      height: number;
    }>
  >([]);
  const duplicateDragRef = useRef<{
    nodeIds: string[];
    anchorId: string;
    sourcePositions: Record<string, { x: number; y: number }>;
    previewSizes: Record<string, { width: number; height: number }>;
  } | null>(null);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const nodeType = e.dataTransfer.getData('nodeType');
      if (!nodeType || !rfInstance || !reactFlowWrapper.current) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const position = (rfInstance as any).screenToFlowPosition({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      });

      createNode(nodeType, position);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rfInstance, reactFlowWrapper]
  );

  const createNode = (type: string, position: { x: number; y: number }) => {
    const id = crypto.randomUUID();
    let data: FlowNode['data'];
    if (type === 'info') {
      data = { type: 'info', title: 'New Info Page', body: '', imageUrl: '' };
    } else if (type === 'question') {
      data = {
        type: 'question',
        title: 'New Question',
        text: '',
        answerType: 'single',
        dataAttribute: '',
        options: [],
        imageUrl: '',
      };
    } else if (type === 'offer') {
      data = { type: 'offer', offerId: '' };
    } else {
      data = { type: 'end' };
    }

    const node: FlowNode = { id, type, position, data };
    addNode(node);
    setSelectedNodeId(id);
  };

  const onNodeContextMenu: NodeMouseHandler = useCallback((e, node) => {
    e.preventDefault();

    const selectedIds = nodes.filter((item) => item.selected).map((item) => item.id);
    const hasSelection = selectedIds.length > 1 && selectedIds.includes(node.id);

    setContextMenu({
      target: hasSelection
        ? { kind: 'selection', nodeIds: selectedIds }
        : { kind: 'node', nodeId: node.id },
      mousePos: { x: e.clientX, y: e.clientY },
    });
  }, [nodes]);

  const onEdgeContextMenu: EdgeMouseHandler = useCallback((e, edge) => {
    e.preventDefault();
    setContextMenu({
      target: { kind: 'edge', edgeId: edge.id },
      mousePos: { x: e.clientX, y: e.clientY },
    });
  }, []);

  const onPaneContextMenu = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      e.preventDefault();
      if (!rfInstance || !reactFlowWrapper.current) return;

      const selectedIds = nodes.filter((item) => item.selected).map((item) => item.id);
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const nativeE = e as MouseEvent;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const position = (rfInstance as any).screenToFlowPosition({
        x: nativeE.clientX - bounds.left,
        y: nativeE.clientY - bounds.top,
      });
      setContextMenu({
        target:
          selectedIds.length > 0
            ? { kind: 'selection', nodeIds: selectedIds }
            : { kind: 'canvas', position },
        mousePos: { x: nativeE.clientX, y: nativeE.clientY },
      });
    },
    [nodes, rfInstance, reactFlowWrapper]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
    setContextMenu(null);
  }, [setSelectedNodeId, setSelectedEdgeId]);

  const onSelectionContextMenu = useCallback(
    (e: React.MouseEvent, selectedNodes: FlowNode[]) => {
      if (!selectedNodes.length) return;
      e.preventDefault();
      setContextMenu({
        target: { kind: 'selection', nodeIds: selectedNodes.map((node) => node.id) },
        mousePos: { x: e.clientX, y: e.clientY },
      });
    },
    []
  );

  const onNodeDragStart: OnNodeDrag<FlowNode> = useCallback((event, node) => {
    const withModifier = Boolean(
      (event as { ctrlKey?: boolean }).ctrlKey ||
      (event as { metaKey?: boolean }).metaKey
    );

    if (!withModifier) {
      duplicateDragRef.current = null;
      setDragPreview([]);
      return;
    }

    const selectedIds = nodes.filter((item) => item.selected).map((item) => item.id);
    const nodeIds =
      selectedIds.length > 1 && selectedIds.includes(node.id) ? selectedIds : [node.id];

    const sourceNodes = nodes.filter((item) => nodeIds.includes(item.id));
    if (!sourceNodes.length) {
      duplicateDragRef.current = null;
      setDragPreview([]);
      return;
    }

    const sourcePositions: Record<string, { x: number; y: number }> = {};
    const previewSizes: Record<string, { width: number; height: number }> = {};
    sourceNodes.forEach((item) => {
      sourcePositions[item.id] = { ...item.position };
      previewSizes[item.id] = {
        width: Math.max(120, item.width ?? 220),
        height: Math.max(60, item.height ?? 96),
      };
    });

    duplicateDragRef.current = {
      nodeIds,
      anchorId: node.id,
      sourcePositions,
      previewSizes,
    };
    setDragPreview(
      sourceNodes.map((item) => ({
        id: item.id,
        position: { ...item.position },
        width: previewSizes[item.id]!.width,
        height: previewSizes[item.id]!.height,
      }))
    );
  }, [nodes]);

  const onNodeDrag: OnNodeDrag<FlowNode> = useCallback(
    (event, node) => {
      const draft = duplicateDragRef.current;
      if (!draft || node.id !== draft.anchorId) return;

      const anchorSource = draft.sourcePositions[draft.anchorId];
      if (!anchorSource) return;
      const delta = {
        x: node.position.x - anchorSource.x,
        y: node.position.y - anchorSource.y,
      };

      const withModifier = Boolean(
        (event as { ctrlKey?: boolean }).ctrlKey ||
        (event as { metaKey?: boolean }).metaKey
      );

      if (!withModifier) {
        const nextPositions = draft.nodeIds
          .map((id) => {
            const source = draft.sourcePositions[id];
            if (!source) return null;
            return {
              id,
              position: {
                x: source.x + delta.x,
                y: source.y + delta.y,
              },
            };
          })
          .filter((item): item is { id: string; position: { x: number; y: number } } => item !== null);

        duplicateDragRef.current = null;
        setDragPreview([]);
        if (nextPositions.length === 1) setNodePosition(nextPositions[0]!.id, nextPositions[0]!.position);
        else setNodesPositions(nextPositions);
        return;
      }

      setDragPreview(
        draft.nodeIds
          .map((id) => {
            const source = draft.sourcePositions[id];
            const size = draft.previewSizes[id];
            if (!source || !size) return null;

            return {
              id,
              position: {
                x: source.x + delta.x,
                y: source.y + delta.y,
              },
              width: size.width,
              height: size.height,
            };
          })
          .filter(
            (item): item is { id: string; position: { x: number; y: number }; width: number; height: number } =>
              item !== null
          )
      );
    },
    [setNodePosition, setNodesPositions]
  );

  const onNodeDragStop: OnNodeDrag<FlowNode> = useCallback(
    (event, node) => {
      const draft = duplicateDragRef.current;
      duplicateDragRef.current = null;
      setDragPreview([]);
      if (!draft || node.id !== draft.anchorId) return;

      const anchorSource = draft.sourcePositions[draft.anchorId];
      if (!anchorSource) return;
      const delta = {
        x: node.position.x - anchorSource.x,
        y: node.position.y - anchorSource.y,
      };

      const withModifier = Boolean(
        (event as { ctrlKey?: boolean }).ctrlKey ||
        (event as { metaKey?: boolean }).metaKey
      );
      if (!withModifier) {
        const nextPositions = draft.nodeIds
          .map((id) => {
            const source = draft.sourcePositions[id];
            if (!source) return null;
            return {
              id,
              position: {
                x: source.x + delta.x,
                y: source.y + delta.y,
              },
            };
          })
          .filter((item): item is { id: string; position: { x: number; y: number } } => item !== null);

        if (nextPositions.length === 1) setNodePosition(nextPositions[0]!.id, nextPositions[0]!.position);
        else setNodesPositions(nextPositions);
        return;
      }

      if (delta.x === 0 && delta.y === 0) {
        return;
      }

      if (draft.nodeIds.length > 1) {
        duplicateSelectionFromDrag(draft.nodeIds, delta);
        return;
      }

      const sourcePosition = draft.sourcePositions[node.id];
      if (!sourcePosition) return;
      duplicateNodeFromDrag(node.id, sourcePosition, { ...node.position });
    },
    [duplicateNodeFromDrag, duplicateSelectionFromDrag, setNodePosition, setNodesPositions]
  );

  const isValidConnection: IsValidConnection<FlowEdge> = useCallback((connection) => {
    return Boolean(
      connection.source &&
      connection.target &&
      connection.source !== connection.target
    );
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange<FlowNode>[]) => {
      const draft = duplicateDragRef.current;
      if (!draft) {
        storeOnNodesChange(changes);
        return;
      }

      const next = changes.map((change) => {
        if (change.type !== 'position' || !draft.nodeIds.includes(change.id)) return change;
        const sourcePosition = draft.sourcePositions[change.id];
        if (!sourcePosition) return change;

        return {
          ...change,
          position: { ...sourcePosition },
          positionAbsolute: change.positionAbsolute ? { ...sourcePosition } : change.positionAbsolute,
        };
      });

      storeOnNodesChange(next);
    },
    [storeOnNodesChange]
  );

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: 'condition', data: { conditions: [] } }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={onEdgeContextMenu}
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onSelectionContextMenu={onSelectionContextMenu}
        onPaneContextMenu={onPaneContextMenu}
        onPaneClick={onPaneClick}
        fitView
        deleteKeyCode={null}
        multiSelectionKeyCode="Shift"
        proOptions={{ hideAttribution: true }}
      >
        <ZoomAwareBackground />
        <Controls />
        <MiniMap
          nodeStrokeWidth={2}
          zoomable
          pannable
          bgColor="var(--canvas-minimap-bg)"
          maskColor="var(--canvas-minimap-mask)"
          maskStrokeColor="var(--canvas-minimap-mask-stroke)"
          nodeColor="var(--canvas-minimap-node)"
          nodeStrokeColor="var(--canvas-minimap-node-stroke)"
        />
        {dragPreview.length > 0 && (
          <ViewportPortal>
            <>
              {dragPreview.map((preview) => (
                <div
                  key={preview.id}
                  className="pointer-events-none absolute rounded-xl border-2 border-dashed border-sky-500 bg-sky-200/40 shadow-sm"
                  style={{
                    width: preview.width,
                    height: preview.height,
                    transform: `translate(${preview.position.x}px, ${preview.position.y}px)`,
                  }}
                />
              ))}
            </>
          </ViewportPortal>
        )}
      </ReactFlow>
      {contextMenu && (
        <ContextMenu
          target={contextMenu.target}
          mousePos={contextMenu.mousePos}
          onClose={() => setContextMenu(null)}
          onAddNode={createNode}
          onPasteAt={pasteFlow}
        />
      )}
    </div>
  );
}
