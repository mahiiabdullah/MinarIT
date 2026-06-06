/**
 * @file src/lib/utils.ts
 * @description Backward-compatible re-export.
 * Existing code importing from '@/lib/utils' continues to work.
 *
 * PREFERRED: import { cn } from '@/lib/utils/cn'
 * LEGACY (still works): import { cn } from '@/lib/utils'
 */

export * from './utils/cn';
export * from './utils/format';
export * from './utils/date';
