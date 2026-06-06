// Pricing page loading skeleton
export default function PricingLoading() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-32">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 text-center pb-16">
        <div className="h-6 w-40 rounded-full skeleton mx-auto mb-6" />
        <div className="h-14 w-3/4 rounded-2xl skeleton mx-auto mb-4" />
        <div className="h-5 w-1/2 rounded skeleton mx-auto mb-8" />
        <div className="h-10 w-64 rounded-full skeleton mx-auto" />
      </div>
      {/* Cards */}
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-8 mb-20">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-96 rounded-2xl skeleton" />
        ))}
      </div>
      {/* Feature comparison */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-80 rounded-2xl skeleton" />
      </div>
    </div>
  );
}
