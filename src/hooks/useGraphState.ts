import { useEffect } from 'react';
import { useNodesState, useEdgesState, type Node, type Edge } from '@xyflow/react';
import { useGraph } from '../services/api';
import type { ServiceNodeData } from '../types';

export function useGraphState(appId: string) {
  const { data: graphData, isLoading, error } = useGraph(appId);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    if (graphData) {
      setNodes(graphData.nodes as unknown as Node[]);
      setEdges(graphData.edges as unknown as Edge[]);
    }
  }, [graphData, setNodes, setEdges]);

  const updateNodeData = (id: string, data: Partial<ServiceNodeData>) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...data } } : n))
    );
  };

  return { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, updateNodeData, isLoading, error };
}
