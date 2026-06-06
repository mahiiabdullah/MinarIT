// Industries page loading skeleton
export default function IndustriesLoading() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-32">
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <div className="h-5 w-36 rounded-full skeleton mx-auto mb-6" />
        <div className="h-16 w-3/4 rounded-2xl skeleton mx-auto mb-4" />
        <div className="h-5 w-1/2 rounded skeleton mx-auto mb-16" />
      </div>
      {/* Industry tabs */}
      <div className="max-w-6xl mx-auto px-6 flex gap-3 flex-wrap justify-center mb-12">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 w-36 rounded-full skeleton" />
        ))}
      </div>
      <div className="max-w-6xl mx-auto px-6 h-96 rounded-2xl skeleton mb-16" />
    </div>
  );
}
