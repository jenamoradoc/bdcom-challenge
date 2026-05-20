function HeaderSkeleton() {
  return (
    <div className="bg-[var(--color-primary)] h-16 flex items-center px-6 gap-6">
      <div className="w-24 h-6 bg-white/20 rounded animate-pulse" />
      <div className="flex-1 max-w-xl h-9 bg-white/20 rounded-lg animate-pulse" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-[var(--radius-card)] shadow-sm overflow-hidden">
      <div className="h-48 md:h-56 bg-gray-200 animate-pulse" />
      <div className="p-3 flex flex-col gap-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3 mt-1" />
      </div>
    </div>
  );
}

export default function SearchLoading() {
  return (
    <>
      <HeaderSkeleton />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
