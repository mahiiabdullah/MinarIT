/**
 * @file src/lib/utils/cn.ts
 * @description Class name utility — merges Tailwind CSS classes safely.
 * Combines clsx (conditional classes) with tailwind-merge (conflict resolution).
 *
 * WHY: Without tailwind-merge, `cn('p-4', 'p-8')` outputs both classes and
 * the winner is unpredictable. With it, the last class always wins.
 *
 * @example
 * cn('bg-red-500', isActive && 'bg-blue-500') // → 'bg-blue-500' if active
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with conditional class support.
 * Resolves Tailwind conflicts deterministically (last value wins).
 *
 * @param inputs - Any number of class values, arrays, or objects
 * @returns A single merged class name string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
