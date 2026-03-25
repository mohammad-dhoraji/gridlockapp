/**
 * Calendar utilities for F1 app
 */

// Detect the next race: first upcoming or last completed
export function detectNextRace(races) {
  const upcoming = races.find((r) => r.status === 'upcoming');
  if (upcoming) return upcoming.id;
  const completed = [...races].filter((r) => r.status === 'completed');
  return completed.length > 0 ? completed[completed.length - 1].id : null;
}
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format single race date as range: e.g. '27–29 FEB'
export function formatDateRange(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const endDay = day + 2;
  const month = date.toLocaleString('en', { month: 'short' }).toUpperCase();
  return `${String(day).padStart(2, '0')}–${String(endDay).padStart(2, '0')} ${month}`;
}

