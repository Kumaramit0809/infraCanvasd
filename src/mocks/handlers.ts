import { http, HttpResponse, delay } from 'msw';
import type { App, GraphResponse } from '../types';

const apps: App[] = [
  { id: '1', name: 'supertokens-golang', color: '#00add8' },
  { id: '2', name: 'supertokens-java', color: '#f89820' },
  { id: '3', name: 'supertokens-python', color: '#3776ab' },
  { id: '4', name: 'supertokens-ruby', color: '#cc342d' },
  { id: '5', name: 'supertokens-go', color: '#00add8' },
];

const graphs: Record<string, GraphResponse> = {
  '1': {
    nodes: [
      {
        id: 'n1',
        type: 'serviceNode',
        position: { x: 360, y: 60 },
        data: {
          label: 'supertokens-core',
          serviceType: 'service',
          status: 'success',
          price: '$0.02/HR',
          metrics: { cpu: '12%', memory: '256MB', disk: '1.2GB', region: 'us-east-1' },
          sliderValue: 40,
          description: 'Core authentication service',
        },
      },
      {
        id: 'n2',
        type: 'serviceNode',
        position: { x: 760, y: 60 },
        data: {
          label: 'Postgres',
          serviceType: 'postgres',
          status: 'success',
          price: '$0.03/HR',
          metrics: { cpu: '8%', memory: '512MB', disk: '10GB', region: 'us-east-1' },
          sliderValue: 60,
          description: 'Primary database',
        },
      },
      {
        id: 'n3',
        type: 'serviceNode',
        position: { x: 200, y: 420 },
        data: {
          label: 'Redis',
          serviceType: 'redis',
          status: 'error',
          price: '$0.01/HR',
          metrics: { cpu: '3%', memory: '128MB', disk: '512MB', region: 'us-east-1' },
          sliderValue: 20,
          description: 'Session cache store',
        },
      },
      {
        id: 'n4',
        type: 'serviceNode',
        position: { x: 760, y: 420 },
        data: {
          label: 'MongoDB',
          serviceType: 'mongodb',
          status: 'success',
          price: '$0.04/HR',
          metrics: { cpu: '15%', memory: '1GB', disk: '20GB', region: 'us-west-2' },
          sliderValue: 75,
          description: 'Analytics document store',
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'n1', target: 'n2', animated: true },
      { id: 'e1-3', source: 'n1', target: 'n3', animated: false },
      { id: 'e1-4', source: 'n1', target: 'n4', animated: true },
    ],
  },
};

// Generate a similar graph for other apps
['2', '3', '4', '5'].forEach((id) => {
  graphs[id] = {
    ...graphs['1'],
    nodes: graphs['1'].nodes.map((n) => ({ ...n, data: { ...n.data } })),
    edges: [...graphs['1'].edges],
  };
});

export const handlers = [
  http.get('/api/apps', async () => {
    await delay(600);
    return HttpResponse.json(apps);
  }),

  http.get('/api/apps/:id/graph', async ({ params }) => {
    await delay(700);
    const graph = graphs[params.id as string] ?? graphs['1'];
    return HttpResponse.json(graph);
  }),
];
