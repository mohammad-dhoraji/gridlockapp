import React, { useMemo } from "react";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import Button from "../components/Button";
import LeaderboardPodiumSkeleton from "../components/ui/LeaderboardPodiumSkeleton";
import LeaderboardRowSkeleton from "../components/ui/LeaderboardRowSkeleton";
import { useLeaderboard } from "../hooks/useLeaderboard";

const mapLeaderboardError = (error) => {
  if (error?.status === 401) return "Please sign in to view leaderboard.";
  if (error?.isTimeout) return "Leaderboard request timed out. Please retry.";
  if (error?.isNetworkError) {
    return "Network issue while loading leaderboard. Please retry.";
  }
  return "Failed to load leaderboard.";
};

const LeaderboardRow = ({ user, isHighlighted = false, className = "" }) => (
  <motion.div
    className={`flex justify-between items-center px-3 sm:px-6 py-3 sm:py-4 rounded-xl border transition-all gap-2 sm:gap-6 group ${
      isHighlighted 
        ? "bg-linear-to-r from-primary/20 to-primary/10 ring-2 ring-primary/50 shadow-lg" 
        : "border-border/50 hover:bg-background/50"
    } ${className}`}
    whileHover={{ scale: 1.01 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex items-center gap-2 sm:gap-6 min-w-0">
      <span className="text-sm sm:text-lg font-f1 tracking-tight text-muted-foreground w-6 sm:w-12 shrink-0">
        #{user.rank}
      </span>
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full ring-2 ring-border/50 group-hover:ring-primary/50 transition-all flex items-center justify-center bg-linear-to-br from-zinc-700 to-zinc-600 text-xs sm:text-sm font-bold uppercase overflow-hidden">
          {user.avatar_url ? (
            <img src={user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
          ) : (
            user.username.slice(0,2).toUpperCase()
          )}
        </div>
        <span className="font-f1 font-semibold text-foreground truncate text-sm sm:text-base">
          {user.username}
        </span>
      </div>
    </div>
    <span className="font-mono font-bold text-primary text-sm sm:text-lg shrink-0 pl-2">
      {user.totalPoints.toLocaleString()} pts
    </span>
  </motion.div>
);

const TopPodium = ({ topThree }) => {
  const p1 = topThree[0];
  const p2 = topThree[1];
  const p3 = topThree[2];

  const renderCard = (user, position) => {
    if (!user) return <div className="w-35 md:w-42.5 shrink-0" key={`empty-${position}`} />;

    const isP1 = position === 1;
    const rankLabel = position === 1 ? "1st" : position === 2 ? "2nd" : "3rd";

    return (
      <motion.div
        key={user.username || position}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.5, 
          delay: position === 1 ? 0.1 : position === 2 ? 0.25 : 0.4,
          ease: "easeOut"
        }}
        className={`relative flex flex-col items-center shrink-0 w-35 md:w-42.5 bg-background/80 backdrop-blur-xl border border-border rounded-2xl shadow-xl overflow-hidden ${
          isP1 
            ? "h-65 md:h-75 ring-2 ring-primary/50 scale-105 z-10" 
            : "h-55 md:h-62.5 z-0 opacity-95"
        }`}
      >
        {isP1 && (
          <div className="absolute inset-0 bg-linear-to-b from-primary/20 via-primary/5 to-transparent opacity-50 pointer-events-none" />
        )}
        
        <div className="relative flex-1 flex flex-col items-center justify-start w-full pt-6 md:pt-8 px-3 md:px-4 z-10">
          <div className="text-3xl md:text-5xl mb-3 md:mb-5 drop-shadow-md">{rankLabel}</div>
          
          <div className={`shrink-0 rounded-full ring-2 flex items-center justify-center bg-linear-to-br from-zinc-700 to-zinc-600 text-foreground font-bold uppercase overflow-hidden mb-3 md:mb-4 shadow-inner ${
            isP1 ? "w-16 h-16 md:w-20 md:h-20 ring-primary/50 text-xl" : "w-12 h-12 md:w-16 md:h-16 ring-border/50 text-md"
          }`}>
            {user.avatar_url ? (
               <img src={user.avatar_url} alt="" className="w-full h-full object-cover" />
            ) : (
               user.username.slice(0, 2).toUpperCase()
            )}
          </div>
          
          <span className="font-f1 font-semibold text-foreground text-center w-full truncate md:text-lg">
            {user.username}
          </span>
        </div>
        
        <div className={`relative w-full py-4 md:py-5 text-center border-t z-10 ${isP1 ? "border-primary/20 bg-primary/10" : "border-border/50 bg-black/20"}`}>
          <div className={`font-mono font-black tracking-tight ${isP1 ? "text-primary text-xl md:text-2xl" : "text-primary/80 text-lg md:text-xl"}`}>
            {user.totalPoints.toLocaleString()}
          </div>
          <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest mt-0.5">Points</div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full overflow-x-auto pb-12 pt-8 -mt-8 text-center whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden block">
      <div className="inline-flex items-end justify-center gap-4 md:gap-7 px-6 pt-10 mt-2 mx-auto text-left whitespace-normal align-top">
        {renderCard(p2, 2)}
        {renderCard(p1, 1)}
        {renderCard(p3, 3)}
      </div>
    </div>
  );
};

// const CurrentUserSection = ({ me, neighbors }) => {
//   if (!me) return null;

//   const isTop10 = me.rank <= 10;
//   const above = neighbors.filter(n => n.rank < me.rank).slice(0,2);
//   const below = neighbors.filter(n => n.rank > me.rank).slice(0,2);

//   return (
//     <motion.section className="max-w-2xl mx-auto py-10">
//       <motion.div 
//         className="bg-linear-to-r from-primary/30 via-primary/20 to-secondary/20 backdrop-blur-xl border border-primary/50 rounded-3xl p-4 sm:p-8 shadow-2xl ring-2 ring-primary/40"
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h3 className="text-2xl font-f1 font-black uppercase tracking-wider mb-6 text-center">
//           {isTop10 ? "You" : "Your Position"}
//         </h3>
        
//         <div className="space-y-3 max-h-96 overflow-y-auto">
//           {!isTop10 && above.map(user => (
//             <LeaderboardRow key={user.rank} user={user} />
//           ))}
          
//           {/* Highlighted Me */}
//           <LeaderboardRow 
//             user={me} 
//             isHighlighted={true}
//             className="scale-105 shadow-xl ring-4 ring-primary/60"
//           />
          
//           {!isTop10 && below.map(user => (
//             <LeaderboardRow key={user.rank} user={user} />
//           ))}
//         </div>
//       </motion.div>
//     </motion.section>
//   );
// };

const Leaderboard = () => {
  const season = useMemo(() => new Date().getUTCFullYear(), []);
  const { data, isLoading, isError, error, refetch } = useLeaderboard({
    mode: "context",
    season,
  });

  const topThree = useMemo(() => data?.top?.slice(0, 3) || [], [data]);
  const rankingList = useMemo(() => data?.top?.slice(3) || [], [data]);
  // const me = useMemo(() => {
  //   if (data?.me) return data.me;
  //   // Try find in top
  //   return data?.top?.find(u => u.username === 'You') || null;
  // }, [data]);
  // const neighbors = useMemo(() => data?.neighbors || [], [data]);
  const errorMessage = useMemo(
    () => (isError ? mapLeaderboardError(error) : ""),
    [error, isError],
  );

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="min-h-screen w-full px-6 text-foreground overflow-x-hidden bg-linear-to-b from-neutral-800 via-neutral-950 to-black py-10">
          <section className="max-w-4xl mx-auto py-10 border-b border-border">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
              <div className="animate-pulse space-y-2">
                <div className="h-12 w-64 bg-zinc-800/50 rounded-xl" />
                <div className="h-4 w-32 bg-zinc-800/30 rounded" />
              </div>
            </div>
          </section>
          <section className="max-w-4xl mx-auto py-10 border-t border-border">
            <LeaderboardPodiumSkeleton />
          </section>
          <section className="max-w-4xl mx-auto py-10 border-t border-border">
            <div className="bg-neutral-800/50 backdrop-blur-xl border border-border rounded-2xl p-4 sm:p-10 shadow-xl h-96">
              <div className="h-10 w-48 bg-zinc-800/50 rounded-xl animate-pulse mb-8" />
              <div className="space-y-2">
                {[...Array(10)].map((_, i) => (
                  <LeaderboardRowSkeleton key={i} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen w-full px-6 text-foreground overflow-x-hidden bg-linear-to-b from-neutral-800 via-neutral-950 to-black py-10">
        <section className="max-w-4xl mx-auto py-10 border-b border-border">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 sm:gap-6 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-f1 font-black uppercase bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Global Leaderboard
              </h1>
              <p className="font-mono text-sm uppercase tracking-wider text-muted-foreground mt-2">
                Season {season} standings
              </p>
            </div>
    
          </div>
        </section>

        {isError ? (
          <section className="max-w-4xl mx-auto py-10">
            <motion.div className="bg-background/50 border border-border p-8 rounded-2xl text-center text-muted-foreground max-w-md mx-auto" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {errorMessage}
              <div className="mt-6">
                <Button onClick={() => refetch()} className="gap-2">Retry</Button>
              </div>
            </motion.div>
          </section>
        ) : (
          <>
            {/* Top Podium */}
            <section className="max-w-4xl mx-auto py-10 border-t border-border">
              <TopPodium topThree={topThree} />
            </section>

            {/* Ranking List */}
            <motion.section className="max-w-4xl mx-auto py-10 border-t border-border" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="bg-background/80 backdrop-blur-xl border border-border rounded-2xl p-4 sm:p-10 shadow-xl">
                <h3 className="text-2xl sm:text-3xl font-f1 font-black uppercase tracking-[0.15em] mb-6 sm:mb-8">Top Performers</h3>
                <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                  {rankingList.length ? (
                    rankingList.map((user, idx) => (
                      <motion.div
                        key={`${user.rank}-${user.username}-${idx}`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.02 }}
                      >
                        <LeaderboardRow user={user} />
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-12">No rankings available</p>
                  )}
                </div>
              </div>
            </motion.section>

            {/* Current User */}
            {/* <CurrentUserSection me={me} neighbors={neighbors} /> */}
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default Leaderboard;
