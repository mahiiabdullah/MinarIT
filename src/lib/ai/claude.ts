/**
 * @file src/lib/ai/claude.ts
 * @description Singleton Anthropic Claude client with typed helper functions.
 * This is the ONLY file that should instantiate the Anthropic SDK.
 * All API routes must call these helpers — never instantiate directly.
 *
 * Server-side ONLY — never import this in client components.
 */

import Anthropic from '@anthropic-ai/sdk';

import { PROMPT_CHAT_ASSISTANT } from '@/constants/ai-prompts';

// ─── Model Constants ──────────────────────────────────────────────────────────
// Centralised here so model upgrades require one change, not a codebase search.

export const AI_MODELS = {
  /** Latest Claude Sonnet — best balance of speed and capability */
  SONNET: 'claude-sonnet-4-20250514',
  /** Claude Haiku — fastest, lowest cost, for simple tasks */
  HAIKU: 'claude-haiku-4-20250514',
} as const;

export type AiModel = (typeof AI_MODELS)[keyof typeof AI_MODELS];

// ─── Token Limits ─────────────────────────────────────────────────────────────

const MAX_TOKENS = {
  CHAT: 1024,
  ANALYSIS: 2048,
  REPORT: 4096,
} as const;

// ─── Client Singleton ─────────────────────────────────────────────────────────

let _client: Anthropic | null = null;

/**
 * Get the singleton Anthropic client instance.
 * Throws a descriptive error if the API key is missing.
 *
 * @returns Initialized Anthropic client
 * @throws Error if ANTHROPIC_API_KEY is not set
 */
function getClient(): Anthropic {
  if (_client) return _client;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      'Missing ANTHROPIC_API_KEY. Add it to .env.local — see .env.example for details.'
    );
  }

  _client = new Anthropic({ apiKey });
  return _client;
}

// ─── Type Definitions ─────────────────────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface CompletionOptions {
  model?: AiModel;
  maxTokens?: number;
  system?: string;
}

// ─── Chat Completion ──────────────────────────────────────────────────────────

/**
 * Send messages to Claude and receive a complete (non-streamed) response.
 * Use this for one-shot queries where streaming is not needed.
 *
 * @param messages - Conversation history in order
 * @param options - Optional model, token limit, and system prompt overrides
 * @returns The assistant's response text
 */
export async function createChatCompletion(
  messages: ChatMessage[],
  options: CompletionOptions = {}
): Promise<string> {
  const client = getClient();
  const {
    model = AI_MODELS.SONNET,
    maxTokens = MAX_TOKENS.CHAT,
    system = PROMPT_CHAT_ASSISTANT.content,
  } = options;

  const response = await client.messages.create({
    model,
    max_tokens: maxTokens,
    system,
    messages,
  });

  const textBlock = response.content.find(block => block.type === 'text');
  return textBlock?.text ?? '';
}

/**
 * Stream a response from Claude word-by-word.
 * Use this for chat UIs where you want to show text as it arrives.
 *
 * @param messages - Conversation history in order
 * @param options - Optional model, token limit, and system prompt overrides
 * @returns Anthropic stream object — pipe to a StreamingTextResponse
 */
export async function createStreamingCompletion(
  messages: ChatMessage[],
  options: CompletionOptions = {}
): Promise<ReturnType<Anthropic['messages']['stream']>> {
  const client = getClient();
  const {
    model = AI_MODELS.SONNET,
    maxTokens = MAX_TOKENS.CHAT,
    system = PROMPT_CHAT_ASSISTANT.content,
  } = options;

  return client.messages.stream({
    model,
    max_tokens: maxTokens,
    system,
    messages,
  });
}

// ─── Error Handling ───────────────────────────────────────────────────────────

/**
 * Map Anthropic SDK errors to user-friendly messages.
 * Always use this in API route catch blocks — never expose raw SDK errors.
 *
 * @param error - The caught error (unknown type)
 * @returns A safe, user-friendly error message string
 */
export function handleAIError(error: unknown): string {
  if (error instanceof Anthropic.APIError) {
    switch (error.status) {
      case 401:
        return 'AI service authentication failed. Please contact support.';
      case 429:
        return 'The AI service is currently busy. Please try again in a moment.';
      case 500:
        return 'The AI service encountered an error. Please try again.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  if (error instanceof Error && error.message.includes('ANTHROPIC_API_KEY')) {
    // Only log key issues server-side — never expose this to the client
    console.error('[Claude] API key configuration error:', error.message);
    return 'The AI service is not configured. Please contact support.';
  }

  console.error('[Claude] Unhandled error:', error);
  return 'Something went wrong. Please try again.';
}

// ─── Legacy Exports ───────────────────────────────────────────────────────────
// These maintain backward compatibility with the old claude.ts structure.

/** @deprecated Use createStreamingCompletion instead */
export const streamChatResponse = createStreamingCompletion;

/** @deprecated Use createChatCompletion instead */
export const getChatResponse = (messages: ChatMessage[]): Promise<string> =>
  createChatCompletion(messages);

export default getClient;
