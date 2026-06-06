/**
 * @file src/types/ui.ts
 * @description UI-specific TypeScript types for component props and design tokens.
 * Import these in component files to ensure consistent prop APIs.
 */

// ─── Component Size ───────────────────────────────────────────────────────────

/** Standard size tokens for all UI components */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// ─── Component Variant ────────────────────────────────────────────────────────

/** Visual variant tokens — maps to color and style */
export type ComponentVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'outline'
  | 'destructive'
  | 'success';

// ─── Animation ────────────────────────────────────────────────────────────────

/** Named animation presets defined in constants/animations.ts */
export type AnimationPreset =
  | 'fadeUp'
  | 'fadeIn'
  | 'fadeDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'none';

/** Framer Motion variant key names */
export type AnimationState = 'hidden' | 'visible' | 'exit';

// ─── Icon Names ───────────────────────────────────────────────────────────────
// Union of all lucide-react icon names used in this project.
// Add new icon names here as they are introduced.

export type IconName =
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Bot'
  | 'Calendar'
  | 'CheckCircle2'
  | 'ChevronDown'
  | 'Clock'
  | 'ExternalLink'
  | 'Link'
  | 'Loader2'
  | 'Mail'
  | 'MessageSquare'
  | 'Minus'
  | 'Search'
  | 'Send'
  | 'Star'
  | 'X'
  | 'Zap';

// ─── Layout ───────────────────────────────────────────────────────────────────

export type BreakpointKey = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// ─── Badge ────────────────────────────────────────────────────────────────────

export type BadgeVariant = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'error';

// ─── Toast / Notification ─────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

// ─── Form State ───────────────────────────────────────────────────────────────

/** Generic async form submission state */
export type FormStatus = 'idle' | 'loading' | 'success' | 'error';
