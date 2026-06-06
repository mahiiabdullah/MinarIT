// AnimatedCounter — number counter that animates when scrolled into view
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks";

interface AnimatedCounterProps {
  value: string;
  label: string;
  className?: string;
  colorClass?: string;
}

export default function AnimatedCounter({
  value,
  label,
  className,
  colorClass,
}: AnimatedCounterProps) {
  const { ref, isInView } = useInView({ threshold: 0.5 });
  const [displayed, setDisplayed] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      // Extract numeric part
      const numericMatch = value.match(/\d+/);
      if (!numericMatch) {
        setDisplayed(value);
        return;
      }

      const target = parseInt(numericMatch[0]);
      const prefix = value.substring(0, value.indexOf(numericMatch[0]));
      const suffix = value.substring(
        value.indexOf(numericMatch[0]) + numericMatch[0].length
      );
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), target);
        setDisplayed(`${prefix}${current}${suffix}`);
        if (step >= steps) clearInterval(timer);
      }, duration / steps);

      return () => clearInterval(timer);
    }
    return undefined;
  }, [isInView, value]);

  return (
    <div ref={ref} className={className}>
      <div className={`text-3xl md:text-4xl font-display font-bold ${colorClass || "gradient-text"}`}>
        {displayed}
      </div>
      <div className="text-sm text-text-secondary mt-1">{label}</div>
    </div>
  );
}
