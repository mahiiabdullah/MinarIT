/**
 * @file src/constants/animations.ts
 * @description Shared Framer Motion animation variants and spring configs.
 *
 * WHY: Centralising motion variants prevents developers from inventing
 * inconsistent animation values across components. Every animated element
 * should use one of these presets. Create a new named preset here if you
 * need a new motion pattern — never define variants inline.
 */

import type { Variants } from 'framer-motion';

// ─── Spring Configs ───────────────────────────────────────────────────────────

export const SPRING_GENTLE = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 1,
} as const;

export const SPRING_BOUNCY = {
  type: 'spring',
  stiffness: 400,
  damping: 15,
  mass: 0.8,
} as const;

export const SPRING_STIFF = {
  type: 'spring',
  stiffness: 600,
  damping: 35,
  mass: 1,
} as const;

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// ─── Fade Variants ────────────────────────────────────────────────────────────

export const FADE_IN: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
};

export const FADE_DOWN: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

export const FADE_LEFT: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
  exit: { opacity: 0, x: 12, transition: { duration: 0.2 } },
};

export const FADE_RIGHT: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
  exit: { opacity: 0, x: -12, transition: { duration: 0.2 } },
};

// ─── Scale Variants ───────────────────────────────────────────────────────────

export const SCALE_IN: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE_OUT_EXPO },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

// ─── Stagger Containers ───────────────────────────────────────────────────────
// Use these as the parent wrapper; children use STAGGER_ITEM

export const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const STAGGER_CONTAINER_FAST: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const STAGGER_ITEM: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT_EXPO },
  },
};

// ─── Chat / Modal Variants ────────────────────────────────────────────────────

export const CHAT_PANEL: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: SPRING_STIFF,
  },
  exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
};

export const MOBILE_MENU: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};
