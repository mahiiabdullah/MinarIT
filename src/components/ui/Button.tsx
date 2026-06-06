// Button — versatile button component with gradient, ghost, and outline variants
"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { buttonHover } from "@/lib/animations";

type ButtonVariant = "gradient" | "ghost" | "outline" | "text";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  gradient: "btn-gradient",
  ghost: "btn-ghost",
  outline:
    "border border-primary/30 text-primary hover:bg-primary/10 rounded-xl transition-all duration-300",
  text: "text-text-secondary hover:text-text-primary transition-colors duration-300",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "gradient",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      className={cn(
        "font-semibold inline-flex items-center justify-center gap-2",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      variants={buttonHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {children}
    </motion.button>
  );
}
