import React from 'react';

const RaceStatusBadge = ({ status, isNext }) => {
  if (isNext) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-sm border border-primary bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        Next Race
      </span>
    );
  }

  if (status === 'results_ready' || status === 'scored' || status === 'completed') {
    return (
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Completed
      </span>
    );
  }

  if (status === 'locked') {
    return (
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
        TBC
      </span>
    );
  }

  return null;
};

export default RaceStatusBadge;

