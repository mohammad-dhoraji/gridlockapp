import { apiPost, apiRequest } from "../lib/api";

const EMPTY_PREDICTION_PAGE = {
  race: null,
  raceStatus: null,
  lockAt: null,
  isLockedByTime: false,
  drivers: [],
  savedPrediction: null,
  hasExistingPrediction: false,
};

const getCurrentRace = async () => {
  try {
    return await apiRequest("/api/races/current");
  } catch (error) {
    if (error?.status === 404) {
      return null;
    }
    throw error;
  }
};

const getSavedPrediction = async (raceId) => {
  try {
    return await apiRequest(`/api/predictions/${raceId}`);
  } catch (error) {
    if (error?.status === 404) {
      return null;
    }
    throw error;
  }
};

const getRaceStatus = async (raceId) => {
  try {
    return await apiRequest(`/v1/races/${raceId}/status`);
  } catch {
    return null;
  }
};

export const getPredictionsPageData = async () => {
  const [race, driverPayload] = await Promise.all([
    getCurrentRace(),
    apiRequest("/api/predictions/drivers"),
  ]);

  const drivers = (driverPayload?.drivers || [])
    .map((entry) => entry.name)
    .filter(Boolean);

  if (!race?.id) {
    return {
      ...EMPTY_PREDICTION_PAGE,
      drivers,
    };
  }

  const [raceStatus, savedPrediction] = await Promise.all([
    getRaceStatus(race.id),
    getSavedPrediction(race.id),
  ]);

  const lockAt =
    raceStatus?.lock_at || race?.lock_at || race?.race_at || race?.race_date;
  const isLockedByTime = lockAt
    ? Date.now() >= new Date(lockAt).getTime()
    : false;

  return {
    race,
    raceStatus,
    lockAt: lockAt || null,
    isLockedByTime,
    drivers,
    savedPrediction,
    hasExistingPrediction: Boolean(savedPrediction),
  };
};

export const savePrediction = async ({ raceId, p1, p2, p3, dotd }) =>
  apiPost("/api/predictions", {
    raceId,
    p1,
    p2,
    p3,
    dotd,
  });
