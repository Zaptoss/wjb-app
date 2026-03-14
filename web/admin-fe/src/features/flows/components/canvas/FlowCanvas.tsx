import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useOnViewportChange,
  type NodeMouseHandler,
  type EdgeMouseHandler,
  type Viewport,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useFlowStore } from '../../store/flowStore';
import { nodeTypes } from './nodes';
import { edgeTypes } from './edges';
import { ContextMenu, type ContextMenuTarget } from './ContextMenu';
import type { FlowNode } from '../../types';

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
      color="#D5D0C8"
      style={{ backgroundColor: '#F0EDE7' }}
    />
  );
}

export function FlowCanvas({ reactFlowWrapper }: Props) {
  const nodes = useFlowStore((s) => s.nodes);
  const edges = useFlowStore((s) => s.edges);
  const onNodesChange = useFlowStore((s) => s.onNodesChange);
  const onEdgesChange = useFlowStore((s) => s.onEdgesChange);
  const onConnect = useFlowStore((s) => s.onConnect);
  const addNode = useFlowStore((s) => s.addNode);
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);
  const setSelectedEdgeId = useFlowStore((s) => s.setSelectedEdgeId);

  const [contextMenu, setContextMenu] = useState<{
    target: ContextMenuTarget;
    mousePos: { x: number; y: number };
  } | null>(null);

  const [rfInstance, setRfInstance] = useState<ReturnType<typeof useFlowStore> | null>(null);

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
    setContextMenu({
      target: { kind: 'node', nodeId: node.id },
      mousePos: { x: e.clientX, y: e.clientY },
    });
  }, []);

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
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const nativeE = e as MouseEvent;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const position = (rfInstance as any).screenToFlowPosition({
        x: nativeE.clientX - bounds.left,
        y: nativeE.clientY - bounds.top,
      });
      setContextMenu({
        target: { kind: 'canvas', position },
        mousePos: { x: nativeE.clientX, y: nativeE.clientY },
      });
    },
    [rfInstance, reactFlowWrapper]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
    setContextMenu(null);
  }, [setSelectedNodeId, setSelectedEdgeId]);

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: 'condition', data: { conditions: [] } }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={onEdgeContextMenu}
        onPaneContextMenu={onPaneContextMenu}
        onPaneClick={onPaneClick}
        fitView
        deleteKeyCode="Delete"
        multiSelectionKeyCode="Shift"
      >
        <ZoomAwareBackground />
        <Controls />
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
      {contextMenu && (
        <ContextMenu
          target={contextMenu.target}
          mousePos={contextMenu.mousePos}
          onClose={() => setContextMenu(null)}
          onAddNode={createNode}
        />
      )}
    </div>
  );
}
