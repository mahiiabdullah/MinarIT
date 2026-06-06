// SectionHeading — reusable section title with badge, heading, and subtext
"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  /** @alias description — use description for new code */
  subtitle?: string;
  align?: "left" | "center";
  /** @alias align="center" — shorthand for centered layout */
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  highlight,
  description,
  subtitle,
  align = "center",
  centered,
  className,
}: SectionHeadingProps) {
  const resolvedDescription = description ?? subtitle;
  const resolvedAlign = centered ? "center" : align;
  return (
    <motion.div
      className={cn(
        "mb-16",
        resolvedAlign === "center" && "text-center",
        className
      )}
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
    >
      {badge && <span className="badge mb-4 inline-block">{badge}</span>}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary mt-3">
        {title}{" "}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {resolvedDescription && (
        <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
          {resolvedDescription}
        </p>
      )}
    </motion.div>
  );
}
