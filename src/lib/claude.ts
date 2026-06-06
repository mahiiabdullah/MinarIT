/**
 * @file src/lib/claude.ts
 * @description Backward-compatible re-export of the Claude AI client.
 * Existing code importing from '@/lib/claude' continues to work.
 *
 * PREFERRED: import { createChatCompletion } from '@/lib/ai/claude'
 * LEGACY (still works): import { streamChatResponse } from '@/lib/claude'
 */

export * from './ai/claude';
export { default } from './ai/claude';
