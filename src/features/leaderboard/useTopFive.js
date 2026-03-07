import { useState, useEffect, useCallback } from "react";
import { apiRequest } from "../../lib/api";

export default function useTopFive() {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTop = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const season = new Date().getUTCFullYear();
      const payload = await apiRequest(
        `/v1/leaderboards/global?season=${season}&page=1&page_size=5`,
      );
      const mapped = (payload?.data || []).map((row, index) => ({
        rank: Number(row.global_rank ?? index + 1),
        name: row.display_name || "Unknown",
        points: Number(row.total_points || 0),
      }));
      setItems(mapped);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTop();
  }, [fetchTop]);

  return { items, loading, error, refetch: fetchTop };
}
