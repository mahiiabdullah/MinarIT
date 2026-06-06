// Blog page loading skeleton — mirrors the hero + filter bar + card grid layout
export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-32">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 text-center pb-16">
        <div className="h-6 w-32 rounded-full skeleton mx-auto mb-6" />
        <div className="h-14 w-2/3 rounded-2xl skeleton mx-auto mb-4" />
        <div className="h-6 w-1/2 rounded skeleton mx-auto" />
      </div>
      {/* Filter Bar */}
      <div className="max-w-6xl mx-auto px-6 mb-12 flex gap-3 justify-between">
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-full skeleton" />
          ))}
        </div>
        <div className="h-10 w-64 rounded-full skeleton" />
      </div>
      {/* Featured */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="h-64 w-full rounded-2xl skeleton" />
      </div>
      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-72 rounded-2xl skeleton" />
        ))}
      </div>
    </div>
  );
}
