import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NodePalette } from '../features/flows/components/sidebar/NodePalette';
import { PropertyPanel } from '../features/flows/components/sidebar/PropertyPanel';
import { FlowToolbar } from '../features/flows/components/toolbar/FlowToolbar';
import { FlowCanvas } from '../features/flows/components/canvas/FlowCanvas';
import { useFlowStore } from '../features/flows/store/flowStore';
import { useFlowPersistence } from '../features/flows/hooks/useFlowPersistence';
import { useUndoRedo } from '../features/flows/hooks/useUndoRedo';
import { db } from '../features/flows/db/flowDb';

export default function FlowEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const loadFlow = useFlowStore((s) => s.loadFlow);
  const setFlowId = useFlowStore((s) => s.setFlowId);
  const [isDirty, setIsDirty] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  useUndoRedo();

  const { markClean } = useFlowPersistence(id ?? '');

  useEffect(() => {
    if (!id) {
      navigate('/flows');
      return;
    }
    db.flowDrafts.get(id).then((draft) => {
      if (draft) {
        loadFlow(draft);
        setIsDirty(draft.isDirty);
      } else {
        setFlowId(id);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Track dirty state from db
  useEffect(() => {
    if (!id) return;
    const interval = setInterval(async () => {
      const draft = await db.flowDrafts.get(id);
      if (draft) setIsDirty(draft.isDirty);
    }, 500);
    return () => clearInterval(interval);
  }, [id]);

  const handleSave = async () => {
    await markClean();
    setIsDirty(false);
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-body)' }}>
      <NodePalette />
      <div className="flex flex-1 flex-col overflow-hidden">
        <FlowToolbar isDirty={isDirty} onSave={handleSave} />
        <div
          className="flex h-8 flex-shrink-0 items-center px-4 text-xs"
          style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}
        >
          <p style={{ color: 'var(--text-tertiary)' }}>
            Tips: Shift + drag = multi-select, Ctrl/Cmd + drag node = duplicate, Ctrl/Cmd + C/V = copy/paste flow, right-click selected nodes for actions.
          </p>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <FlowCanvas reactFlowWrapper={reactFlowWrapper} />
          </div>
          <PropertyPanel />
        </div>
      </div>
    </div>
  );
}
