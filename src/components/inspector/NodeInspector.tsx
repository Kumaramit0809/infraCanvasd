import { X } from 'lucide-react';
import { useAppStore, useActiveInspectorTab } from '../../store/useAppStore';
import type { ServiceNodeData } from '../../types';
import { cn } from '../../lib/utils';

interface InspectorProps {
  nodeId: string;
  data: ServiceNodeData;
  onClose: () => void;
  onDataChange: (id: string, data: Partial<ServiceNodeData>) => void;
}

export function NodeInspector({ nodeId, data, onClose, onDataChange }: InspectorProps) {
  const activeTab = useActiveInspectorTab();
  const setTab = useAppStore((s) => s.setActiveInspectorTab);
  const isError = data.status === 'error';

  return (
    <div className="w-72 bg-panel border-l border-border flex flex-col shrink-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-white">{data.label}</span>
          <span
            className={cn(
              'text-[10px] px-2 py-0.5 rounded-full border font-medium',
              isError
                ? 'text-error bg-error/10 border-error/20'
                : 'text-success bg-success/10 border-success/20'
            )}
          >
            {isError ? 'Degraded' : 'Healthy'}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-md text-muted hover:text-white hover:bg-white/5 flex items-center justify-center transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border px-4">
        {(['config', 'runtime'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setTab(tab)}
            className={cn(
              'text-xs py-2.5 px-3 border-b-2 capitalize transition-colors',
              activeTab === tab
                ? 'border-accent text-accent font-medium'
                : 'border-transparent text-muted hover:text-white'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'config' ? (
          <>
            <div>
              <label className="text-[11px] text-muted uppercase tracking-wider block mb-1.5">
                Node Name
              </label>
              <input
                value={data.label}
                onChange={(e) => onDataChange(nodeId, { label: e.target.value })}
                className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="text-[11px] text-muted uppercase tracking-wider block mb-1.5">
                Description
              </label>
              <textarea
                value={data.description}
                onChange={(e) => onDataChange(nodeId, { description: e.target.value })}
                rows={3}
                className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-[11px] text-muted uppercase tracking-wider block mb-1.5">
                Service Type
              </label>
              <div className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-muted capitalize">
                {data.serviceType}
              </div>
            </div>

            <div>
              <label className="text-[11px] text-muted uppercase tracking-wider block mb-1.5">
                Status
              </label>
              <select
                value={data.status}
                onChange={(e) => onDataChange(nodeId, { status: e.target.value as ServiceNodeData['status'] })}
                className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-accent transition-colors"
              >
                <option value="success">Success</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-muted uppercase tracking-wider block mb-1.5">
                Pricing
              </label>
              <input
                value={data.price}
                onChange={(e) => onDataChange(nodeId, { price: e.target.value })}
                className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-white font-mono outline-none focus:border-accent transition-colors"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] text-muted uppercase tracking-wider">
                  Capacity
                </label>
                <span className="text-xs text-white font-mono">{data.sliderValue}%</span>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                value={data.sliderValue}
                onChange={(e) => onDataChange(nodeId, { sliderValue: Number(e.target.value) })}
                className="w-full accent-accent h-1.5"
              />

              <div className="mt-3">
                <label className="text-[11px] text-muted uppercase tracking-wider block mb-1.5">
                  Numeric Value
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={data.sliderValue}
                  onChange={(e) => {
                    const val = Math.min(100, Math.max(0, Number(e.target.value)));
                    onDataChange(nodeId, { sliderValue: val });
                  }}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-white font-mono outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="text-[11px] text-muted uppercase tracking-wider">Live Metrics</div>
              {[
                { label: 'CPU', value: data.metrics.cpu, color: 'bg-blue-500' },
                { label: 'Memory', value: data.metrics.memory, color: 'bg-purple-500' },
                { label: 'Disk', value: data.metrics.disk, color: 'bg-emerald-500' },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted">{label}</span>
                    <span className="text-white font-mono">{value}</span>
                  </div>
                  <div className="h-1 bg-border rounded-full overflow-hidden">
                    <div className={cn('h-full rounded-full', color)} style={{ width: '45%' }} />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="text-[11px] text-muted uppercase tracking-wider mb-2">Region</div>
              <div className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-white font-mono">
                {data.metrics.region}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
