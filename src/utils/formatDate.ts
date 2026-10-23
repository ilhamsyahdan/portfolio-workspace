/**
 * Formats an ISO date string (e.g. "2026-10-10") as "October 10, 2026".
 * Uses UTC so a date-only value never shifts to the previous day
 * in timezones behind UTC.
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
