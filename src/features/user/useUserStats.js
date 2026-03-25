import { useProfile } from "../../hooks/useProfile";

export default function useUserStats() {
  const profileQuery = useProfile({ includePredictions: false });

  return {
    stats: profileQuery.summary,
    loading: profileQuery.loading,
    error: profileQuery.error,
    refetch: profileQuery.refetchSummary,
  };
}
