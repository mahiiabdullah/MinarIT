/**
 * @file src/lib/utils/date.ts
 * @description Date formatting and calculation utilities.
 * All functions are pure and unit-testable.
 */

// ─── Constants ────────────────────────────────────────────────────────────────

/** Average adult reading speed in words per minute */
const WORDS_PER_MINUTE = 200;

// ─── Functions ────────────────────────────────────────────────────────────────

/**
 * Format a Date object or ISO date string into a human-readable string.
 *
 * @param date - A Date object or ISO 8601 date string
 * @returns Formatted date string, e.g. "January 15, 2025"
 *
 * @example formatDate(new Date('2025-01-15')) → "January 15, 2025"
 * @example formatDate('2025-01-15') → "January 15, 2025"
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * Format a date as a short string for compact display.
 *
 * @param date - A Date object or ISO 8601 date string
 * @returns Short date string, e.g. "Jan 15, 2025"
 */
export function formatDateShort(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * Calculate the estimated reading time for a body of text.
 *
 * @param content - The text content to measure
 * @returns Estimated reading time in minutes (minimum 1)
 *
 * @example getReadingTime("...1000 words...") → 5
 */
export function getReadingTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

/**
 * Check if a date is in the past relative to now.
 *
 * @param date - The date to check
 * @returns true if the date is before the current moment
 *
 * @example isDateInPast(new Date('2020-01-01')) → true
 */
export function isDateInPast(date: Date): boolean {
  return date.getTime() < Date.now();
}

/**
 * Get a relative time string like "3 days ago" or "in 2 weeks".
 * Uses the Intl.RelativeTimeFormat API.
 *
 * @param date - The date to compare against now
 * @returns Human-readable relative time string
 *
 * @example getRelativeTime(new Date(Date.now() - 86400000)) → "1 day ago"
 */
export function getRelativeTime(date: Date): string {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const diffMs = date.getTime() - Date.now();
  const diffDays = Math.round(diffMs / 86_400_000);
  const diffWeeks = Math.round(diffMs / 604_800_000);
  const diffMonths = Math.round(diffMs / 2_592_000_000);

  if (Math.abs(diffDays) < 7) return rtf.format(diffDays, 'day');
  if (Math.abs(diffWeeks) < 4) return rtf.format(diffWeeks, 'week');
  return rtf.format(diffMonths, 'month');
}
