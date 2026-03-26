import { apiRequest } from "../lib/api";

const normalizeRace = (rawRace) => ({
  id: rawRace.id,
  name: rawRace.name,
  circuit: rawRace.circuit_name,
  date: rawRace.race_at,
  status: rawRace.race_state,
});

export async function fetchRaces() {
  const response = await apiRequest("/v1/races");
  if (!Array.isArray(response?.data)) {
    throw new Error("Invalid races response");
  }

  return response.data.map(normalizeRace);
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
