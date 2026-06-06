// ============================================
// useCountUp — Animated number counter hook
// ============================================

"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  prefix?: string;
  suffix?: string;
  enabled?: boolean;
}

export function useCountUp({
  end,
  duration = 2000,
  start = 0,
  prefix = "",
  suffix = "",
  enabled = true,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasStarted = useRef(false);

  const reset = useCallback(() => {
    setCount(start);
    setIsComplete(false);
    hasStarted.current = false;
    startTimeRef.current = null;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  }, [start]);

  useEffect(() => {
    if (!enabled || hasStarted.current) return;
    hasStarted.current = true;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);

      setCount(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
        setIsComplete(true);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, start, enabled]);

  const formatted = `${prefix}${count}${suffix}`;

  return { count, formatted, isComplete, reset };
}
