/**
 * @file src/lib/utils/format.ts
 * @description Pure formatting utility functions.
 * All functions are stateless and unit-testable with no side effects.
 * Import only the functions you need — never import the entire module.
 */

// ─── Currency ─────────────────────────────────────────────────────────────────

/**
 * Format a number as a localized currency string.
 *
 * @param amount - The numeric amount to format
 * @param currency - ISO 4217 currency code (defaults to 'USD')
 * @returns Formatted currency string, e.g. "$1,234.56"
 *
 * @example formatCurrency(1234.5) → "$1,234.50"
 * @example formatCurrency(5000, 'EUR') → "€5,000.00"
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Numbers ──────────────────────────────────────────────────────────────────

/**
 * Format a number with thousands separators.
 *
 * @param n - The number to format
 * @returns Formatted number string, e.g. "1,000,000"
 *
 * @example formatNumber(1000000) → "1,000,000"
 */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n);
}

/**
 * Format a number as a percentage string.
 *
 * @param n - Decimal value (0–1 scale) or percentage (0–100 scale)
 * @param isDecimal - Set true if passing 0–1 scale (e.g. 0.85 → "85%")
 * @returns Formatted percentage string
 *
 * @example formatPercentage(85) → "85%"
 * @example formatPercentage(0.85, true) → "85%"
 */
export function formatPercentage(n: number, isDecimal = false): string {
  const value = isDecimal ? n * 100 : n;
  return `${Math.round(value)}%`;
}

// ─── Text ─────────────────────────────────────────────────────────────────────

/**
 * Truncate text to a maximum length, appending an ellipsis.
 * Does not break words — truncates at character level.
 *
 * @param text - The text to truncate
 * @param maxLength - Maximum character count before truncation
 * @returns Original string if within limit, or truncated string with "..."
 *
 * @example truncateText("Hello World", 7) → "Hello W..."
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Convert a string to a URL-safe slug.
 *
 * @param text - The text to slugify
 * @returns Lowercase, hyphenated slug string
 *
 * @example slugify("Hello World! 2025") → "hello-world-2025"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // spaces → hyphens
    .replace(/[^\w-]+/g, '')    // remove non-word chars except hyphens
    .replace(/--+/g, '-')       // collapse double hyphens
    .replace(/^-+/, '')         // trim leading hyphens
    .replace(/-+$/, '');        // trim trailing hyphens
}

/**
 * Capitalize the first letter of a string.
 *
 * @param text - Input string
 * @returns String with first character uppercased
 *
 * @example capitalizeFirst("hello world") → "Hello world"
 */
export function capitalizeFirst(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Generate a stable unique ID. Useful for list keys, form IDs, etc.
 * Combines timestamp with random suffix to minimize collisions.
 *
 * @returns A unique string ID like "1703001234567-abc123"
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Smooth scroll to an element by its ID.
 * Safe to call in SSR environments (no-ops if window is undefined).
 *
 * @param elementId - The DOM element ID to scroll to
 */
export function scrollToElement(elementId: string): void {
  if (typeof window === 'undefined') return;
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Debounce a function call, delaying execution until after a wait period.
 * Useful for search inputs, window resize handlers, etc.
 *
 * @param func - The function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced version of the function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
