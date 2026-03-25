import React from 'react';
import ProfileHeaderSkeleton from './ProfileHeaderSkeleton';
import PerformanceSnapshotSkeleton from './PerformanceSnapshotSkeleton';
import RecentRacesSkeleton from './RecentRacesSkeleton';
import LeaderboardPreviewSkeleton from './LeaderboardPreviewSkeleton';
import UserSnapshotSkeleton from './UserSnapshotSkeleton';
import Skeleton from '../Skeleton';

const ProfileSkeleton = () => (
  <div className="min-h-screen bg-linear-to-b from-neutral-800 via-neutral-950 to-black text-white px-6 py-10 w-full space-y-10">
    {/* ProfileHeader */}
    <ProfileHeaderSkeleton className="max-w-5xl mx-auto" />
    
    {/* PerformanceSnapshot */}
    <PerformanceSnapshotSkeleton className="max-w-5xl mx-auto" />
    
    {/* Snapshot Grid */}
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
      <UserSnapshotSkeleton className="p-10 rounded-b-3xl border border-zinc-800 shadow-2xl bg-zinc-900/70" />
      <LeaderboardPreviewSkeleton className="space-y-3 p-10 rounded-b-3xl border border-zinc-800 shadow-2xl bg-zinc-900/70" />
    </div>
    
    {/* RecentRaces + Account */}
    <RecentRacesSkeleton className="max-w-5xl mx-auto" />
    
    {/* Account section skeleton */}
    <div className="max-w-5xl mx-auto">
      <div className="relative bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-b-3xl p-10 shadow-2xl shadow-black/40 flex justify-between items-center h-24">
        <div className="absolute -top-1 left-0 w-full h-0.75 bg-linear-to-r from-[#c1a362] via-red-500/60 to-[#c1a362] rounded-t-3xl" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-12 w-32 rounded-xl" />
      </div>
    </div>
  </div>
);

export default ProfileSkeleton;

