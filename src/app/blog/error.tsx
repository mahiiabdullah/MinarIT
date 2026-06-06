"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[Blog Error]", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#0A0F1E] pt-32 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6">📰</div>
        <h2 className="text-2xl font-bold text-white mb-3">Failed to load blog</h2>
        <p className="text-gray-400 mb-8">
          We could not load the blog content. Please try again or browse our other pages.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <Link href="/" className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
