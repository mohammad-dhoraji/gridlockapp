import React from 'react';

const GridLockIcon = React.memo(({ size = 24, mode = 'dark', className = '' }) => {
  const primaryColor = mode === 'dark' ? '#FFFFFF' : '#0A0B0F';
  const accentColor = '#E10600';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="GridLock icon"
    >
      <g transform="translate(40, 15) skewX(-15)">
        {/* Left Spine */}
        <path 
          d="M 40 15 L 20 15 L 5 30 L 5 69 L 20 84 L 40 84 L 40 69 L 25 69 L 20 64 L 20 35 L 25 30 L 40 30 Z" 
          fill={primaryColor} 
        />
        {/* Top Slot */}
        <path 
          d="M 45 15 L 90 15 L 80 30 L 45 30 Z" 
          fill={accentColor} 
        />
        {/* Bottom Block */}
        <path 
          d="M 45 45 L 84 45 L 58 84 L 45 84 L 45 69 L 55 69 L 63 57 L 45 57 Z" 
          fill={primaryColor} 
        />
      </g>
    </svg>
  );
});

GridLockIcon.displayName = 'GridLockIcon';

export default GridLockIcon;

