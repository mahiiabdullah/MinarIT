// GradientBackground — decorative glow orbs for section backgrounds
"use client";

import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  className?: string;
  variant?: "default" | "hero" | "section";
}

export default function GradientBackground({
  className,
  variant = "default",
}: GradientBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none -z-10", className)}>
      {variant === "hero" && (
        <>
          <div className="glow-orb-primary w-[600px] h-[600px] top-[-200px] left-[-100px]" />
          <div className="glow-orb-accent w-[500px] h-[500px] top-[100px] right-[-200px]" />
          <div className="glow-orb-primary w-[300px] h-[300px] bottom-[100px] left-[30%] opacity-10" />
        </>
      )}
      {variant === "section" && (
        <>
          <div className="glow-orb-primary w-[400px] h-[400px] top-[50%] left-[-100px] opacity-10" />
          <div className="glow-orb-accent w-[300px] h-[300px] bottom-[-100px] right-[-50px] opacity-10" />
        </>
      )}
      {variant === "default" && (
        <div className="glow-orb-primary w-[400px] h-[400px] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 opacity-5" />
      )}
    </div>
  );
}
