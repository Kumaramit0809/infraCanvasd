import type { ServiceType } from '../../types';

interface ServiceIconProps {
  type: ServiceType;
  size?: number;
}

export function ServiceIcon({ type, size = 24 }: ServiceIconProps) {
  const s = size;

  if (type === 'postgres') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="6" rx="8" ry="3" fill="#336791" />
        <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" fill="#336791" opacity="0.7" />
        <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" fill="#4a90d9" opacity="0.5" />
        <ellipse cx="12" cy="6" rx="8" ry="3" fill="none" stroke="#4a90d9" strokeWidth="1" />
      </svg>
    );
  }

  if (type === 'redis') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M12 4L20 8L12 12L4 8L12 4Z" fill="#dc382d" />
        <path d="M4 8V16L12 20V12L4 8Z" fill="#a41e11" />
        <path d="M20 8V16L12 20V12L20 8Z" fill="#ff6b6b" opacity="0.8" />
      </svg>
    );
  }

  if (type === 'mongodb') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M12 3C12 3 8 7 8 13C8 16.5 10 19 12 21C14 19 16 16.5 16 13C16 7 12 3 12 3Z" fill="#4db33d" />
        <path d="M12 21V14" stroke="#4db33d" strokeWidth="2" />
      </svg>
    );
  }

  if (type === 'cube') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="#6366f1" opacity="0.8" />
        <path d="M12 2V12M12 12L20 7M12 12L4 7" stroke="#a5b4fc" strokeWidth="1.5" />
      </svg>
    );
  }

  // Default: generic service
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="2" fill="#2563eb" opacity="0.8" />
      <circle cx="7" cy="12" r="1.5" fill="#93c5fd" />
      <path d="M11 12H19" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 9H16" stroke="#93c5fd" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M11 15H14" stroke="#93c5fd" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function AwsLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" fill="none">
      <path d="M22.4 32.8C20.3 34.2 17.4 35 14.2 35C9.1 35 5 32.2 5 27.5C5 23.2 8.5 20.5 13.8 20.5C16 20.5 17.8 20.9 19.5 21.6V20.8C19.5 17.8 17.6 16.2 14.2 16.2C12 16.2 9.9 16.8 8.1 17.8L6.5 14.4C8.9 13.1 11.6 12.4 14.6 12.4C21.1 12.4 24.5 15.8 24.5 21.5V34.5H22.4V32.8ZM19.5 25.1C17.9 24.3 16.1 23.8 14 23.8C11 23.8 9.3 25.1 9.3 27.3C9.3 29.6 11.2 30.9 13.9 30.9C16.5 30.9 18.6 29.7 19.5 27.8V25.1Z" fill="#FF9900" />
      <path d="M35.4 35C32.6 35 30.2 34.2 28.3 32.7L30 29.5C31.5 30.7 33.4 31.5 35.5 31.5C37.8 31.5 39 30.5 39 29C39 27.5 37.8 26.8 35.1 26C31.4 24.9 28.9 23.5 28.9 19.8C28.9 16.1 31.8 13.4 36.2 13.4C38.7 13.4 40.8 14.1 42.5 15.3L40.9 18.5C39.5 17.5 37.8 16.8 36.1 16.8C33.9 16.8 32.9 17.9 32.9 19.3C32.9 20.8 34.1 21.4 36.8 22.3C40.6 23.5 43 24.9 43 28.7C43 32.6 40.2 35 35.4 35Z" fill="#FF9900" />
      <path d="M65.8 13.8H70.2L62.1 34.5H58.5L50.4 13.8H54.8L60.3 29.5L65.8 13.8Z" fill="#FF9900" />
    </svg>
  );
}
