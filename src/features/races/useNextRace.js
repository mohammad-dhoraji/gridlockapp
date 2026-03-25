import { useNextRace as useNextRaceQuery } from "../../hooks/useNextRace";

export default function useNextRace() {
  const query = useNextRaceQuery();

  return {
    race: query.data || null,
    loading: query.isPending,
    error: query.error || null,
    refetch: query.refetch,
  };
}
