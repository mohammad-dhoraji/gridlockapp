import React from 'react';
import Skeleton from '../Skeleton';

const ProfileHeaderSkeleton = ({ className = '' }) => (
  <div className={`w-full h-48 rounded-2xl animate-pulse bg-zinc-900/70 border border-zinc-800 shadow-2xl ${className}`}>
    {/* Top gradient bar */}
    <div className="absolute -top-1 left-0 w-full h-0.75 bg-gradient-to-r from-[#c1a362] via-red-500/60 to-[#c1a362] rounded-t-3xl" />
    
    <div className="relative h-full p-10 flex flex-col justify-end">
      {/* Avatar placeholder */}
      <div className="flex items-center gap-6 mb-6">
        <div className="w-24 h-24 rounded-full bg-zinc-800/50 border-4 border-zinc-700/50" />
        <div className="space-y-3">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-5 w-48" />
        </div>
      </div>
      
      {/* Stats row */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-7 w-20 rounded-lg" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-7 w-24 rounded-lg" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-7 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

export default ProfileHeaderSkeleton;

