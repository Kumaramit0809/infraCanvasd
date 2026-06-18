import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Settings2 } from 'lucide-react';
import type { ServiceNodeData } from '../../types';
import { ServiceIcon, AwsLogo } from '../ui/ServiceIcon';
import { cn } from '../../lib/utils';

type Props = NodeProps & { data: ServiceNodeData };

const tabs = ['Config', 'Metrics', 'Logs', 'Alerts'];

export function ServiceNode({ data, selected }: Props) {
  const isError = data.status === 'error';

  return (
    <div
      className={cn(
        'node-card w-64 bg-card rounded-xl border transition-all',
        selected ? 'border-accent shadow-lg shadow-accent/10' : 'border-border'
      )}
    >
      {/* Connection handles */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      {/* Header */}
      <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-border">
        <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center shrink-0">
          <ServiceIcon type={data.serviceType} size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-white truncate block">{data.label}</span>
        </div>
        <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20 whitespace-nowrap font-mono">
          {data.price}
        </span>
        <button className="text-muted hover:text-white transition-colors">
          <Settings2 size={14} />
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-px bg-border mx-3 mt-2.5 rounded-lg overflow-hidden text-xs">
        {[
          { label: 'CPU', value: data.metrics.cpu },
          { label: 'Memory', value: data.metrics.memory },
          { label: 'Disk', value: data.metrics.disk },
          { label: 'Region', value: data.metrics.region },
        ].map(({ label, value }) => (
          <div key={label} className="bg-card px-2 py-1.5">
            <div className="text-muted text-[10px] uppercase tracking-wide">{label}</div>
            <div className="text-white font-medium mt-0.5 truncate">{value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mt-2.5 px-3">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={cn(
              'text-[10px] py-1.5 px-2 border-b-2 transition-colors',
              i === 0
                ? 'border-accent text-accent font-medium'
                : 'border-transparent text-muted hover:text-white'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div className="px-3 py-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-muted uppercase tracking-wide">Capacity</span>
          <span className="text-[10px] text-white font-mono">{data.sliderValue}%</span>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all', isError ? 'bg-error' : 'bg-accent')}
            style={{ width: `${data.sliderValue}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-border">
        <AwsLogo size={32} />
        <span
          className={cn(
            'text-[10px] px-2 py-0.5 rounded-full font-semibold border',
            isError
              ? 'text-error bg-error/10 border-error/20'
              : 'text-success bg-success/10 border-success/20'
          )}
        >
          {isError ? 'Error' : 'Success'}
        </span>
      </div>
    </div>
  );
}
