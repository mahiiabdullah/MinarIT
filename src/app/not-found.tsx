import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Minar Agency",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center max-w-xl">
        {/* 404 number */}
        <div className="text-[120px] sm:text-[180px] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-cyan-500 mb-4 select-none">
          404
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          This page does not exist
        </h1>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          The page you are looking for may have been moved, deleted, or never existed.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
          >
            Go to Homepage
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-600">
          Looking for something specific?{" "}
          <Link href="/blog" className="text-violet-400 hover:text-violet-300 transition-colors">
            Browse our blog
          </Link>{" "}
          or{" "}
          <Link href="/case-studies" className="text-violet-400 hover:text-violet-300 transition-colors">
            view case studies
          </Link>
        </div>
      </div>
    </main>
  );
}
