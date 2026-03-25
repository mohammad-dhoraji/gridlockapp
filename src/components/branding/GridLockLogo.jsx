import React from 'react';
import GridLockIcon from './GridLockIcon';

const GridLockLogo = React.memo(({ size = 32, mode = 'dark', className = '' }) => {
  const primaryColor = mode === 'dark' ? '#FFFFFF' : '#0A0B0F';

  const textStyle = {
    fontSize: `${size * 0.5}px`,
    marginTop: `${size * 0.05}px`,
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <GridLockIcon size={size} mode={mode} />
      <span 
        className="font-f1 font-black italic tracking-wider leading-none"
        style={textStyle}
      >
        <span style={{ color: primaryColor }}>GRID</span>
        <span style={{ color: '#E10600' }}>LOCK</span>
      </span>
    </div>
  );
});

GridLockLogo.displayName = 'GridLockLogo';

export default GridLockLogo;

