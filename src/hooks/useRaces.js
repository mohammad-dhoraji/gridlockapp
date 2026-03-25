import { useQuery } from "@tanstack/react-query";
import { fetchRaces } from "../services/racesService";

export function useRaces() {
  return useQuery({
    queryKey: ["races"],
    queryFn: fetchRaces,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
