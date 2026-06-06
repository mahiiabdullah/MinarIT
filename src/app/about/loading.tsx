// About page loading skeleton
export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-32">
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <div className="h-5 w-28 rounded-full skeleton mx-auto mb-6" />
        <div className="h-16 w-3/4 rounded-2xl skeleton mx-auto mb-4" />
        <div className="h-5 w-1/2 rounded skeleton mx-auto mb-20" />
      </div>
      {/* Team grid */}
      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-20">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-64 rounded-2xl skeleton" />
        ))}
      </div>
    </div>
  );
}
