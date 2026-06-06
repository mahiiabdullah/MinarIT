// ============================================
// POST /api/industry-insight — Generate Industry-Specific Insight
// ============================================

import { type NextRequest, NextResponse } from 'next/server';

import { PROMPT_INDUSTRY_INSIGHT } from '@/constants/ai-prompts';
import { createChatCompletion, handleAIError } from '@/lib/ai/claude';
import { industryInsightSchema } from '@/lib/validations/forms';

export const runtime = 'nodejs';

export async function POST(
  req: NextRequest
): Promise<NextResponse> {
  try {
    // Step 1: Parse and validate input with Zod
    const body: unknown = await req.json();
    const result = industryInsightSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Industry field is required.',
          code: 'VALIDATION_ERROR',
        },
        { status: 400 }
      );
    }

    const { industry } = result.data;

    // Step 2: Get response via centralized Claude client
    const insight = await createChatCompletion(
      [
        {
          role: 'user',
          content: `Generate a 2-line insight for the ${industry} industry.`,
        },
      ],
      {
        system: PROMPT_INDUSTRY_INSIGHT.content,
        maxTokens: 150,
      }
    );

    // Step 3: Return consistent success shape
    return NextResponse.json({
      success: true,
      data: {
        insight:
          insight ||
          'We can build a custom operating system to automate your specific business workflows.',
      },
    });
  } catch (error) {
    console.error('[API /industry-insight]', error);
    const errorMessage = handleAIError(error);
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        code: 'SERVER_ERROR',
      },
      { status: 500 }
    );
  }
}
