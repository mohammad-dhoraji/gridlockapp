import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getLeaderboardContext,
  getLeaderboardPreview,
} from "../services/leaderboardService";

const LEADERBOARD_STALE_TIME = 1000 * 60 * 3;
const LEADERBOARD_GC_TIME = 1000 * 60 * 30;

export function useLeaderboard({ mode = "context", season, pageSize = 5 } = {}) {
  const resolvedSeason = useMemo(() => {
    if (typeof season === "number" && Number.isFinite(season)) {
      return season;
    }
    return new Date().getUTCFullYear();
  }, [season]);

  const isPreviewMode = mode === "preview";

  return useQuery({
    queryKey: isPreviewMode
      ? ["leaderboard", "preview", resolvedSeason, pageSize]
      : ["leaderboard", "context", resolvedSeason],
    queryFn: () =>
      isPreviewMode
        ? getLeaderboardPreview({ season: resolvedSeason, pageSize })
        : getLeaderboardContext({ season: resolvedSeason }),
    staleTime: LEADERBOARD_STALE_TIME,
    gcTime: LEADERBOARD_GC_TIME,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

