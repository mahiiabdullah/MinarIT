// Contact page loading skeleton
export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-32">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 py-20">
        {/* Left */}
        <div>
          <div className="h-5 w-32 rounded-full skeleton mb-6" />
          <div className="h-14 w-4/5 rounded-2xl skeleton mb-4" />
          <div className="h-5 w-3/4 rounded skeleton mb-2" />
          <div className="h-5 w-2/3 rounded skeleton mb-12" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl skeleton shrink-0" />
              <div className="flex-1">
                <div className="h-4 w-1/3 rounded skeleton mb-2" />
                <div className="h-3 w-2/3 rounded skeleton" />
              </div>
            </div>
          ))}
        </div>
        {/* Right — Form */}
        <div className="h-[640px] rounded-2xl skeleton" />
      </div>
    </div>
  );
}
