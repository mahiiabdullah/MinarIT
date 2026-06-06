"use client";

import { useEffect } from "react";
import Link from "next/link";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log to console (replace with Sentry in production)
    console.error("[Global Error Boundary]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0A0F1E] flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          {/* Glowing orb */}
          <div className="relative mx-auto mb-10 w-24 h-24">
            <div className="absolute inset-0 rounded-full bg-red-500/20 blur-2xl" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-red-500/30 to-red-900/30 border border-red-500/30 flex items-center justify-center text-5xl">
              ⚠
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-400 mb-2 leading-relaxed">
            An unexpected error occurred. Our team has been notified.
          </p>
          {error.digest && (
            <p className="text-xs text-gray-600 mb-8 font-mono">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={reset}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-8 py-3 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
