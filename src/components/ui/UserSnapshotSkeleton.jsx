import React from 'react';
import Skeleton  from '../Skeleton';

const UserSnapshotSkeleton = ({ className = '' }) => (
  <div className={`space-y-4 text-zinc-300 animate-pulse ${className}`}>
    <div className="flex justify-between items-center">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-7 w-12 rounded-lg" />
    </div>
    <div className="flex justify-between items-center">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-7 w-16 rounded-lg" />
    </div>
    <div className="flex justify-between items-center">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-7 w-20 rounded-lg" />
    </div>
  </div>
);

export default UserSnapshotSkeleton;

