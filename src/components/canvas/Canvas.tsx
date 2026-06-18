import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  addEdge,
  useReactFlow,
  PanOnScrollMode,
  type Connection,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback } from 'react';
import { useAppStore, useSelectedNodeId } from '../../store/useAppStore';
import { ServiceNode } from './ServiceNode';
import { Maximize2 } from 'lucide-react';

const nodeTypes = { serviceNode: ServiceNode };

function FitViewButton() {
  const { fitView } = useReactFlow();
  return (
    <button
      onClick={() => fitView({ padding: 0.2, duration: 300 })}
      title="Fit View"
      className="absolute top-3 right-3 z-10 w-8 h-8 bg-panel border border-border rounded-md flex items-center justify-center text-muted hover:text-white hover:border-gray-600 transition-colors"
    >
      <Maximize2 size={14} />
    </button>
  );
}

interface CanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  isLoading: boolean;
}

export function Canvas({ nodes, edges, onNodesChange, onEdgesChange, setEdges, setNodes, isLoading }: CanvasProps) {
  const selectedNodeId = useSelectedNodeId();
  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId) {
        setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
        setEdges((eds) => eds.filter((ed) => ed.source !== selectedNodeId && ed.target !== selectedNodeId));
        setSelectedNodeId(null);
      }
    },
    [selectedNodeId, setNodes, setEdges, setSelectedNodeId]
  );

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-bg">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted text-sm">Loading graph...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0" tabIndex={0} onKeyDown={handleKeyDown} style={{ outline: 'none' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        deleteKeyCode={null}
        proOptions={{ hideAttribution: true }}
        style={{ background: '#090b10' }}
        zoomOnScroll={false}
        zoomOnPinch={true}
        zoomOnDoubleClick={false}
        panOnScroll={true}
        panOnScrollMode={PanOnScrollMode.Free}
        minZoom={0.4}
        maxZoom={1.5}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1f2937" />
        <Controls />
        <MiniMap nodeColor="#1f2937" maskColor="rgba(9,11,16,0.8)" style={{ background: '#0d1117' }} />
        <FitViewButton />
      </ReactFlow>
    </div>
  );
}
