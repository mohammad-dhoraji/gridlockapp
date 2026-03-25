import { useLeaderboard } from "../../hooks/useLeaderboard";

export default function useTopFive() {
  const query = useLeaderboard({ mode: "preview", pageSize: 5 });

  return {
    items: query.data || [],
    loading: query.isPending,
    error: query.error || null,
    refetch: query.refetch,
  };
}
