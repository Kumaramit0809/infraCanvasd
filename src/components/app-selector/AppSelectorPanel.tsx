import { ChevronRight, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { useApps } from '../../services/api';
import { useAppStore, useSelectedAppId } from '../../store/useAppStore';
import { cn } from '../../lib/utils';

function AppSkeleton() {
  return (
    <div className="animate-pulse space-y-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-9 rounded-md bg-white/5" />
      ))}
    </div>
  );
}

export function AppSelectorPanel() {
  const [search, setSearch] = useState('');
  const { data: apps, isLoading } = useApps();
  const selectedAppId = useSelectedAppId();
  const setSelectedAppId = useAppStore((s) => s.setSelectedAppId);

  const filtered = apps?.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const colors: Record<string, string> = {
    '1': '#00add8',
    '2': '#f89820',
    '3': '#3776ab',
    '4': '#cc342d',
    '5': '#00add8',
  };

  return (
    <div className="absolute top-3 left-3 z-20 w-64 bg-panel border border-border rounded-xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
        <span className="text-sm font-semibold text-white">Application</span>
        <button className="w-6 h-6 rounded-md bg-accent hover:bg-blue-500 transition-colors flex items-center justify-center">
          <Plus size={13} className="text-white" />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-2.5 border-b border-border">
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-card border border-border">
          <Search size={12} className="text-muted shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search apps..."
            className="bg-transparent text-xs text-white placeholder:text-muted outline-none w-full"
          />
        </div>
      </div>

      {/* App list */}
      <div className="py-1.5 max-h-64 overflow-y-auto">
        {isLoading ? (
          <div className="px-3 py-2">
            <AppSkeleton />
          </div>
        ) : (
          filtered?.map((app) => (
            <button
              key={app.id}
              onClick={() => setSelectedAppId(app.id)}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors group',
                selectedAppId === app.id
                  ? 'bg-accent/10'
                  : 'hover:bg-white/5'
              )}
            >
              <div
                className="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ backgroundColor: colors[app.id] ?? '#6b7280' }}
              >
                {app.name[0].toUpperCase()}
              </div>
              <span
                className={cn(
                  'text-xs flex-1 truncate',
                  selectedAppId === app.id ? 'text-white font-medium' : 'text-muted group-hover:text-white'
                )}
              >
                {app.name}
              </span>
              <ChevronRight
                size={12}
                className={cn(
                  'shrink-0 transition-colors',
                  selectedAppId === app.id ? 'text-accent' : 'text-muted/50 group-hover:text-muted'
                )}
              />
            </button>
          ))
        )}
      </div>
    </div>
  );
}
