import { useEffect } from 'react';
import { useFlowStore } from '../store/flowStore';

export function useUndoRedo() {
  const undo = useFlowStore((s) => s.undo);
  const redo = useFlowStore((s) => s.redo);
  const nodes = useFlowStore((s) => s.nodes);
  const copyFlow = useFlowStore((s) => s.copyFlow);
  const copySelected = useFlowStore((s) => s.copySelected);
  const pasteFlow = useFlowStore((s) => s.pasteFlow);

  const isTypingTarget = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false;
    const tag = target.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;
      if (!ctrl) return;
      if (isTypingTarget(e.target)) return;

      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
        e.preventDefault();
        redo();
      } else if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        const selectedNodeIds = nodes.filter((node) => node.selected).map((node) => node.id);
        if (selectedNodeIds.length > 0) copySelected(selectedNodeIds);
        else copyFlow();
      } else if (e.key.toLowerCase() === 'v') {
        e.preventDefault();
        pasteFlow();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, nodes, copyFlow, copySelected, pasteFlow]);
}
