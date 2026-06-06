// ============================================
// POST /api/contact — Contact Form Submission
// ============================================

import { type NextRequest, NextResponse } from 'next/server';

import { contactSubmissionSchema } from '@/lib/validations/forms';
import type { ApiResponse } from '@/types/api';

interface ContactSubmissionData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  industry?: string;
  service?: string | string[];
  budget?: string;
  message: string;
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<ContactSubmissionData>>> {
  try {
    // Step 1: Parse and validate input with Zod
    const body: unknown = await req.json();
    const result = contactSubmissionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data. Please check your inputs.',
          code: 'VALIDATION_ERROR',
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // Step 2: Business logic
    // TODO(team): Integrate with email service (SendGrid, Resend, etc.)
    // TODO(team): Store in database
    // TODO(team): Send Slack notification
    console.log('[API /contact] Form submission:', data);

    // Step 3: Return consistent success shape
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('[API /contact]', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit form. Please try again.',
        code: 'SERVER_ERROR',
      },
      { status: 500 }
    );
  }
}
