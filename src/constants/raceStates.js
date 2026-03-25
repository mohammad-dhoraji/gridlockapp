/**
 * Single source of truth for race state values used in the UI.
 * Must match the backend `race_state_enum` type.
 */
export const RACE_STATES = {
  UPCOMING: "upcoming",
  LOCKED: "locked",
  RESULTS_READY: "results_ready",
  SCORED: "scored",
};

/** Race states where predictions are no longer accepted. */
export const LOCKED_RACE_STATES = [
  RACE_STATES.LOCKED,
  RACE_STATES.RESULTS_READY,
  RACE_STATES.SCORED,
];

/** Race states that indicate results/scoring are done. */
export const COMPLETED_RACE_STATES = [
  RACE_STATES.RESULTS_READY,
  RACE_STATES.SCORED,
];

/**
 * Human-readable labels for each race state.
 */
export const RACE_STATE_LABELS = {
  [RACE_STATES.UPCOMING]: "Upcoming",
  [RACE_STATES.LOCKED]: "Locked",
  [RACE_STATES.RESULTS_READY]: "Completed",
  [RACE_STATES.SCORED]: "Completed",
};
