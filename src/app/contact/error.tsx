"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ContactError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error("[Contact Error]", error); }, [error]);
  return (
    <main className="min-h-screen bg-[#0A0F1E] pt-32 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6">✉️</div>
        <h2 className="text-2xl font-bold text-white mb-3">Contact form unavailable</h2>
        <p className="text-gray-400 mb-8">
          The contact form could not be loaded. Please email us directly at{" "}
          <a href="mailto:hello@minar.agency" className="text-violet-400">hello@minar.agency</a>
        </p>
        <div className="flex items-center justify-center gap-4">
          <button onClick={reset} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold hover:opacity-90 transition-opacity">Try Again</button>
          <Link href="/" className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-colors">Go Home</Link>
        </div>
      </div>
    </main>
  );
}
