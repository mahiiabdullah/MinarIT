// Global loading skeleton — shown during RSC suspense at root level.
// Matches the general layout: full-height dark screen with shimmer blocks.
export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col">
      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/5 bg-[#0A0F1E]/80">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="h-9 w-24 rounded-lg skeleton" />
          <div className="hidden lg:flex items-center gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-16 rounded skeleton" />
            ))}
          </div>
          <div className="h-10 w-32 rounded-xl skeleton" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="flex-1 pt-32 pb-20 px-6 flex flex-col items-center">
        <div className="h-6 w-48 rounded-full skeleton mb-8" />
        <div className="h-16 w-3/4 max-w-2xl rounded-2xl skeleton mb-4" />
        <div className="h-16 w-1/2 max-w-xl rounded-2xl skeleton mb-8" />
        <div className="h-5 w-2/3 max-w-lg rounded skeleton mb-2" />
        <div className="h-5 w-1/2 max-w-md rounded skeleton mb-12" />
        <div className="flex gap-4">
          <div className="h-12 w-44 rounded-xl skeleton" />
          <div className="h-12 w-36 rounded-xl skeleton" />
        </div>
      </div>
    </div>
  );
}
