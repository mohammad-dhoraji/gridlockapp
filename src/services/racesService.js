import { apiRequest } from "../lib/api";

const normalizeRace = (rawRace) => ({
  id: rawRace.id,
  name: rawRace.name,
  circuit: rawRace.circuit,
  date: rawRace.date || rawRace.race_date,
  status: rawRace.status,
});

export async function fetchRaces() {
  const response = await apiRequest("/v1/races");
  return Array.isArray(response?.data) ? response.data.map(normalizeRace) : [];
}

export async function fetchNextRace() {
  try {
    return await apiRequest("/api/races/current");
  } catch (error) {
    if (error?.status === 404) {
      return null;
    }
    throw error;
  }
}

