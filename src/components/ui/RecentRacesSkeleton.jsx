import React from 'react';
import RaceCardSkeleton from './RaceCardSkeleton';

const RecentRacesSkeleton = ({ className = '' }) => (
  <div className={`space-y-4 p-10 rounded-b-3xl border border-zinc-800 bg-zinc-900/70 shadow-2xl animate-pulse ${className}`}>
    <div className="flex items-center justify-between mb-8">
      <div className="h-10 w-48 bg-zinc-800/50 rounded-xl" />
      <div className="h-6 w-24 bg-zinc-800/30 rounded-lg" />
    </div>
    <div className="space-y-4">
      <RaceCardSkeleton />
      <RaceCardSkeleton />
      <RaceCardSkeleton />
    </div>
  </div>
);

export default RecentRacesSkeleton;

