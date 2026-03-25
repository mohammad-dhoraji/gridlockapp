import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPredictionsPageData,
  savePrediction,
} from "../services/predictionsService";

const PREDICTIONS_STALE_TIME = 1000 * 60 * 2;
const PREDICTIONS_GC_TIME = 1000 * 60 * 30;

const EMPTY_DATA = {
  race: null,
  raceStatus: null,
  lockAt: null,
  isLockedByTime: false,
  drivers: [],
  savedPrediction: null,
  hasExistingPrediction: false,
};

export function usePredictions() {
  const queryClient = useQueryClient();

  const pageQuery = useQuery({
    queryKey: ["predictions", "page"],
    queryFn: getPredictionsPageData,
    staleTime: PREDICTIONS_STALE_TIME,
    gcTime: PREDICTIONS_GC_TIME,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const submitMutation = useMutation({
    mutationFn: savePrediction,
    onSuccess: (savedPrediction, variables) => {
      queryClient.setQueryData(["predictions", "page"], (previousData) => {
        if (!previousData) return previousData;
        if (previousData.race?.id !== variables?.raceId) return previousData;

        return {
          ...previousData,
          savedPrediction,
          hasExistingPrediction: true,
        };
      });

      queryClient.invalidateQueries({ queryKey: ["profile", "summary"] });
      queryClient.invalidateQueries({ queryKey: ["profile", "predictions"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const pageData = pageQuery.data || EMPTY_DATA;

  return {
    ...pageData,
    isLoading: pageQuery.isPending,
    error: pageQuery.error || null,
    refetch: pageQuery.refetch,
    submitPrediction: submitMutation.mutateAsync,
    submitting: submitMutation.isPending,
    submitError: submitMutation.error || null,
  };
}
