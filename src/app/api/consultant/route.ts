// ============================================
// POST /api/consultant — AI Business Consultant (Streaming)
// ============================================

import { type NextRequest } from 'next/server';

import { PROMPT_AI_CONSULTANT } from '@/constants/ai-prompts';
import { createStreamingCompletion, handleAIError } from '@/lib/ai/claude';
import type { ChatMessage } from '@/lib/ai/claude';
import { consultantRequestSchema } from '@/lib/validations/forms';

export const runtime = 'nodejs';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    // Step 1: Parse and validate input with Zod
    const body: unknown = await req.json();
    const result = consultantRequestSchema.safeParse(body);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid request. Message is required.',
          code: 'VALIDATION_ERROR',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { message, conversation_history, detected_industry } = result.data;

    // Step 2: Format messages for Claude
    const messages: ChatMessage[] = [
      ...conversation_history.map((msg) => ({
        role: (msg.role === 'ai' ? 'assistant' : 'user') as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user' as const, content: message },
    ];

    // Step 3: Optionally augment system prompt if industry was detected
    const systemPrompt = detected_industry
      ? `${PROMPT_AI_CONSULTANT.content}\n\nThe user may be operating in the ${detected_industry} sector. Contextualize advice if relevant.`
      : PROMPT_AI_CONSULTANT.content;

    // Step 4: Stream via centralized Claude client
    const stream = await createStreamingCompletion(messages, {
      system: systemPrompt,
      maxTokens: 1000,
    });

    // Step 5: Create SSE ReadableStream
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              const chunk = encoder.encode(
                `data: ${JSON.stringify({ text: event.delta.text })}\n\n`
              );
              controller.enqueue(chunk);
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (streamError) {
          controller.error(streamError);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('[API /consultant]', error);
    const message = handleAIError(error);
    return new Response(
      JSON.stringify({
        success: false,
        error: message,
        code: 'SERVER_ERROR',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
