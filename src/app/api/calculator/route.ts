// ============================================
// POST /api/calculator — AI Business Efficiency Calculator
// ============================================

import { type NextRequest, NextResponse } from 'next/server';

import { PROMPT_CALCULATOR_ANALYSIS } from '@/constants/ai-prompts';
import { createChatCompletion, handleAIError } from '@/lib/ai/claude';
import { calculatorRequestSchema } from '@/lib/validations/forms';

export const maxDuration = 60;

export async function POST(
  req: NextRequest
): Promise<NextResponse> {
  try {
    // Step 1: Parse and validate input with Zod
    const body: unknown = await req.json();
    const result = calculatorRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid calculator input. Please fill all required fields.',
          code: 'VALIDATION_ERROR',
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // Step 2: Build the analysis prompt
    const userPrompt = `
Analyze the following business:
- Industry: ${data.industry}
- Employees: ${data.employees}
- Monthly Customers/Orders: ${data.monthly_customers}
- Current Tools: ${
      Array.isArray(data.current_tools)
        ? data.current_tools.join(', ')
        : data.current_tools
    }
- Biggest Bottleneck: ${data.bottleneck}
- Hourly Cost per Employee: ${data.currency}${data.hourly_cost}
    `;

    // Step 3: Get response via centralized Claude client
    const responseText = await createChatCompletion(
      [{ role: 'user', content: userPrompt }],
      {
        system: PROMPT_CALCULATOR_ANALYSIS.content,
        maxTokens: 1500,
      }
    );

    // Step 4: Parse Claude's JSON response
    try {
      // WHY: Claude sometimes wraps JSON in markdown code fences
      const cleanedString = responseText
        .replace(/```json\n?/g, '')
        .replace(/\n?```/g, '')
        .trim();
      const parsedJSON = JSON.parse(cleanedString);
      return NextResponse.json({ success: true, data: parsedJSON });
    } catch (parseError) {
      console.error('[API /calculator] JSON parse error:', responseText);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to parse AI response into valid JSON.',
          code: 'PARSE_ERROR',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[API /calculator]', error);
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
