import { Grid3x3 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ServiceIcon } from '../ui/ServiceIcon';

function GithubMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.9.57.1.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.74.4-1.26.72-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.42.36.78 1.07.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

const items = [
  { node: <GithubMark />, label: 'GitHub', active: true },
  { node: <ServiceIcon type="postgres" size={20} />, label: 'PostgreSQL' },
  { node: <ServiceIcon type="redis" size={20} />, label: 'Redis' },
  { node: <ServiceIcon type="mongodb" size={20} />, label: 'MongoDB' },
  { node: <ServiceIcon type="cube" size={20} />, label: 'Cube' },
  { node: <Grid3x3 size={18} />, label: 'Grid' },
];

export function SideRail() {
  return (
    <div className="w-[60px] bg-panel border-r border-border flex flex-col items-center py-4 gap-1.5 shrink-0 z-10">
      {items.map(({ node, label, active }) => (
        <button
          key={label}
          title={label}
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
            active
              ? 'bg-accent/15 ring-1 ring-accent/40 text-accent'
              : 'text-muted hover:text-white hover:bg-white/5'
          )}
        >
          {node}
        </button>
      ))}
    </div>
  );
}
