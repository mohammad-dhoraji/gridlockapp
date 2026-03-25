import { apiRequest } from "../lib/api";



export const fetchNextRace = async () => {
  try {
    return await apiRequest("/api/races/current");
  } catch (error) {
    if (error?.status === 404) {
      return null;
    }
    throw error;
  }
};

