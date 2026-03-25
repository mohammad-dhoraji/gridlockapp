import React from 'react';

const GridLockBlueprintLogo = React.memo(({ size = 350, className = '' }) => {
  return (
    <div className={`relative w-full h-[300px] blueprint-grid flex items-center justify-center overflow-hidden ${className}`}>
      <svg width={size} height={size * 300 / 350} viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg" className="opacity-80" role="img" aria-label="GridLock blueprint logo">
        <defs>
          <pattern id="smallGrid" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M 4 0 L 0 0 0 4" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="140" height="120" fill="url(#smallGrid)" />
        
        <g transform="translate(40, 15) skewX(-15)">
          {/* Base outlines */}
          <path d="M 40 15 L 20 15 L 5 30 L 5 69 L 20 84 L 40 84 L 40 69 L 25 69 L 20 64 L 20 35 L 25 30 L 40 30 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          <path d="M 45 15 L 90 15 L 80 30 L 45 30 Z" fill="rgba(225,6,0,0.1)" stroke="#E10600" strokeWidth="1" />
          <path d="M 45 45 L 84 45 L 58 84 L 45 84 L 45 69 L 55 69 L 63 57 L 45 57 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          
          {/* Construction lines */}
          <line x1="-20" y1="15" x2="120" y2="15" stroke="rgba(225,6,0,0.5)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="-20" y1="84" x2="120" y2="84" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="45" y1="0" x2="45" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="1 3" />
          
          {/* Vertex Markers */}
          <circle cx="5" cy="30" r="1.5" fill="#E10600" />
          <circle cx="45" cy="15" r="1.5" fill="#E10600" />
          <circle cx="90" cy="15" r="1.5" fill="#FFFFFF" />
          <circle cx="58" cy="84" r="1.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
});

GridLockBlueprintLogo.displayName = 'GridLockBlueprintLogo';

export default GridLockBlueprintLogo;

