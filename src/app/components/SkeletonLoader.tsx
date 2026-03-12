export function HeroSkeleton() {
  return (
    <div className="relative h-[600px] bg-neutral-200 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-3xl px-6">
          <div className="h-16 bg-neutral-300 rounded mb-6 w-3/4 mx-auto"></div>
          <div className="h-8 bg-neutral-300 rounded mb-8 w-2/3 mx-auto"></div>
          <div className="h-12 bg-neutral-300 rounded w-48 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm shadow-sm" style={{ backgroundColor: '#ffffffa6' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-neutral-300 rounded-full animate-pulse"></div>
            <div className="h-8 w-32 bg-neutral-300 rounded animate-pulse"></div>
          </div>
          
          <nav className="flex gap-4 md:gap-8">
            <div className="h-6 w-20 bg-neutral-300 rounded animate-pulse"></div>
            <div className="h-6 w-16 bg-neutral-300 rounded animate-pulse"></div>
            <div className="h-6 w-20 bg-neutral-300 rounded animate-pulse"></div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white overflow-hidden">
      <div className="aspect-[3/4] bg-neutral-200 animate-pulse"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-neutral-200 rounded animate-pulse w-3/4"></div>
        <div className="h-8 bg-neutral-200 rounded animate-pulse w-1/2"></div>
        <div className="space-y-2">
          <div className="h-12 bg-neutral-200 rounded animate-pulse"></div>
          <div className="h-12 bg-neutral-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="h-12 bg-neutral-200 rounded animate-pulse w-64 mx-auto mb-4"></div>
          <div className="h-6 bg-neutral-200 rounded animate-pulse w-96 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
