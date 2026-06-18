import { Share2, Sun, User } from 'lucide-react';

export function TopNav() {
  return (
    <div className="h-12 bg-panel border-b border-border flex items-center justify-between px-4 shrink-0 z-10">
      <div className="flex items-center gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h5v5H2zM9 4h5v5H9zM2 11h5v3H2zM9 11h5v3H9z" fill="white" opacity="0.9" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">InfraCanvas</span>
        </div>
        <div className="w-px h-5 bg-border" />
        <span className="text-sm text-muted">Infrastructure Visualizer</span>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-muted hover:text-white hover:border-gray-600 transition-colors text-xs">
          <Share2 size={13} />
          Share
        </button>
        <button className="w-8 h-8 rounded-md border border-border text-muted hover:text-white hover:border-gray-600 transition-colors flex items-center justify-center">
          <Sun size={14} />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <User size={14} className="text-white" />
        </div>
      </div>
    </div>
  );
}
