// Case studies loading skeleton
export default function CaseStudiesLoading() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-32">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="h-5 w-36 rounded-full skeleton mx-auto mb-6" />
        <div className="h-14 w-2/3 rounded-2xl skeleton mx-auto mb-4" />
        <div className="h-5 w-1/2 rounded skeleton mx-auto mb-16" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-80 rounded-2xl skeleton" />
          ))}
        </div>
      </div>
    </div>
  );
}
