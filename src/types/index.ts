export interface App {
  id: string;
  name: string;
  color: string;
}

export type NodeStatus = 'success' | 'error' | 'warning';
export type ServiceType = 'service' | 'postgres' | 'redis' | 'mongodb' | 'cube';

export interface NodeMetrics {
  cpu: string;
  memory: string;
  disk: string;
  region: string;
}

export interface ServiceNodeData {
  label: string;
  serviceType: ServiceType;
  status: NodeStatus;
  price: string;
  metrics: NodeMetrics;
  sliderValue: number;
  description: string;
}

export interface GraphResponse {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: ServiceNodeData;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

export type InspectorTab = 'config' | 'runtime';
