import React from 'react';
import Skeleton from '../Skeleton';

const LeaderboardPreviewSkeleton = ({ className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex justify-between py-2 px-3 bg-zinc-800/30 rounded-lg animate-pulse">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-16" />
      </div>
    ))}
  </div>
);

export default LeaderboardPreviewSkeleton;

