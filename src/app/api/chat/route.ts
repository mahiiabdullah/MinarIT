// ============================================
// POST /api/chat — Claude AI Chat Endpoint (Streaming)
// ============================================

import { type NextRequest } from 'next/server';

import { chatRequestSchema } from '@/lib/validations/forms';
import { createStreamingCompletion, handleAIError } from '@/lib/ai/claude';
import type { ChatMessage } from '@/lib/ai/claude';

export const runtime = 'nodejs';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    // Step 1: Parse and validate input with Zod
    const body: unknown = await req.json();
    const result = chatRequestSchema.safeParse(body);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid message format.',
          code: 'VALIDATION_ERROR',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Step 2: Map to typed messages
    const typedMessages: ChatMessage[] = result.data.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Step 3: Stream via centralized Claude client
    const stream = await createStreamingCompletion(typedMessages);

    // Step 4: Create SSE ReadableStream from Anthropic stream
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
    console.error('[API /chat]', error);
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
