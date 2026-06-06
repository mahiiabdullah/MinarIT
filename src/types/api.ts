/**
 * @file src/types/api.ts
 * @description Shared API response shapes used across all API routes and client-side fetchers.
 * Every route must return one of these types — never a raw object.
 */

// ─── Generic Response Wrapper ─────────────────────────────────────────────────

/** Successful API response */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

/** Failed API response — never exposes internal error details to clients */
export interface ApiErrorResponse {
  success: false;
  error: string;
  code?: string;
}

/** Union type for all API responses */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

// ─── API Error ────────────────────────────────────────────────────────────────

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
}

// ─── Request Body Types ───────────────────────────────────────────────────────

/** POST /api/chat */
export interface ChatRequestBody {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

/** POST /api/contact */
export interface ContactRequestBody {
  name: string;
  email: string;
  company: string;
  phone?: string;
  industry: string;
  projectType: string;
  budget: string;
  message: string;
}

/** POST /api/calculator */
export interface CalculatorRequestBody {
  industry: string;
  teamSize: number;
  manualHoursPerWeek: number;
  avgHourlyRate: number;
  currentPainPoints: string[];
}

/** POST /api/newsletter */
export interface NewsletterRequestBody {
  email: string;
}

// ─── Response Data Types ──────────────────────────────────────────────────────

/** Response from /api/calculator */
export interface CalculatorResult {
  weeklyHoursLost: number;
  monthlyHoursLost: number;
  annualHoursLost: number;
  annualCostLost: number;
  recommendedTier: 'starter' | 'growth' | 'enterprise';
  estimatedROI: number;
  paybackPeriodMonths: number;
}

/** Response from /api/chat */
export interface ChatResponse {
  message: string;
}
