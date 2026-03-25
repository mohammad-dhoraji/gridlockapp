import React from 'react';
import Skeleton from '../Skeleton';

const NextRaceSkeleton = ({ className = '' }) => (
  <div className={`bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-b-3xl p-10 shadow-2xl shadow-black/40 relative animate-pulse ${className}`}>
    <div className="absolute -top-1 left-0 w-full h-0.75 bg-gradient-to-r from-[#c1a362] via-red-500/60 to-[#c1a362] rounded-t-3xl bg-neutral-800" />

    {/* Header */}
    <div className="flex items-center justify-between mb-8">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-6 w-28 rounded-full" />
    </div>

    {/* Content: flag + info + button */}
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
      <Skeleton className="w-24 h-24 rounded-xl" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-9 w-48 mx-auto md:mx-0" />
        <Skeleton className="h-5 w-56 mx-auto md:mx-0" />
        <Skeleton className="h-6 w-32 mx-auto md:mx-0 rounded-full" />
      </div>
      <Skeleton className="h-11 w-36 px-5 py-2 rounded-xl" />
    </div>
  </div>
);

export default NextRaceSkeleton;

