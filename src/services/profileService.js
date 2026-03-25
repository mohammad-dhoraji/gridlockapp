import { apiRequest } from "../lib/api";

/**
 * Get the profile summary for the logged-in user.
 * Calls GET /api/profile/summary
 */
export async function getProfileSummary() {
  return apiRequest("/api/profile/summary");
}

export const getProfile = getProfileSummary;

/**
 * Get predictions for the logged-in user.
 * Calls GET /api/profile/predictions
 */
export async function getUserPredictions() {
  return apiRequest("/api/profile/predictions");
}

