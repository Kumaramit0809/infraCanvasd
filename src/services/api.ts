import { useQuery } from '@tanstack/react-query';
import type { App, GraphResponse } from '../types';

async function fetchApps(): Promise<App[]> {
  const res = await fetch('/api/apps');
  if (!res.ok) throw new Error('Failed to fetch apps');
  return res.json();
}

async function fetchGraph(appId: string): Promise<GraphResponse> {
  const res = await fetch(`/api/apps/${appId}/graph`);
  if (!res.ok) throw new Error('Failed to fetch graph');
  return res.json();
}

export function useApps() {
  return useQuery({
    queryKey: ['apps'],
    queryFn: fetchApps,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGraph(appId: string) {
  return useQuery({
    queryKey: ['graph', appId],
    queryFn: () => fetchGraph(appId),
    enabled: !!appId,
    staleTime: 30 * 1000,
  });
}
