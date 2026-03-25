import { apiRequest } from "../lib/api";

const toRows = (payloadRows) =>
  (payloadRows || []).map((row, index) => ({
    rank: Number(row.global_rank ?? index + 1),
    username: row.display_name || "Unknown",
    totalPoints: Number(row.total_points || 0),
    avatar_url: row.avatar_url || null,
  }));

const toPreviewRows = (payloadRows) =>
  (payloadRows || []).map((row, index) => ({
    rank: Number(row.global_rank ?? index + 1),
    name: row.display_name || "Unknown",
    points: Number(row.total_points || 0),
  }));

export const getLeaderboardContext = async ({ season }) => {
  try {
    return await apiRequest(`/v1/leaderboard/context?season=${season}`);
  } catch {
    const fallback = await apiRequest(
      `/v1/leaderboards/global?season=${season}&page=1&page_size=20`,
    );

    return {
      top: toRows(fallback?.data),
      me: null,
      neighbors: [],
    };
  }
};

export const getLeaderboardPreview = async ({ season, pageSize = 5 }) => {
  const payload = await apiRequest(
    `/v1/leaderboards/global?season=${season}&page=1&page_size=${pageSize}`,
  );
  return toPreviewRows(payload?.data);
};

