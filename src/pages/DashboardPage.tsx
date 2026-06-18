import { useEffect, useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { TopNav } from '../components/layout/TopNav';
import { SideRail } from '../components/layout/SideRail';
import { AppSelectorPanel } from '../components/app-selector/AppSelectorPanel';
import { Canvas } from '../components/canvas/Canvas';
import { NodeInspector } from '../components/inspector/NodeInspector';
import { Sheet, SheetContent } from '../components/ui/sheet';
import { useGraphState } from '../hooks/useGraphState';
import { useAppStore, useSelectedAppId, useSelectedNodeId } from '../store/useAppStore';
import type { ServiceNodeData } from '../types';

export function DashboardPage() {
  const selectedAppId = useSelectedAppId();
  const selectedNodeId = useSelectedNodeId();
  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId);

  const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, updateNodeData, isLoading } =
    useGraphState(selectedAppId);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  const mergedData = selectedNode?.data as ServiceNodeData | undefined;

  return (
    <div className="h-screen w-screen flex flex-col bg-bg overflow-hidden">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <SideRail />
        <div className="flex-1 relative">
          <AppSelectorPanel />
          <ReactFlowProvider>
            <Canvas
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              setNodes={setNodes}
              setEdges={setEdges}
              isLoading={isLoading}
            />
          </ReactFlowProvider>
        </div>

        {/* Desktop inspector */}
        {!isMobile && mergedData && selectedNode && (
          <NodeInspector
            nodeId={selectedNode.id}
            data={mergedData}
            onClose={() => setSelectedNodeId(null)}
            onDataChange={updateNodeData}
          />
        )}
      </div>

      {/* Mobile inspector drawer */}
      {isMobile && (
        <Sheet open={!!selectedNodeId} onOpenChange={(open) => !open && setSelectedNodeId(null)}>
          <SheetContent className="p-0">
            {mergedData && selectedNode && (
              <NodeInspector
                nodeId={selectedNode.id}
                data={mergedData}
                onClose={() => setSelectedNodeId(null)}
                onDataChange={updateNodeData}
              />
            )}
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
