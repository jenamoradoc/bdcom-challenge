function HeaderSkeleton() {
  return (
    <div className="bg-[var(--color-primary)] h-16 flex items-center px-6 gap-6">
      <div className="w-24 h-6 bg-white/20 rounded animate-pulse" />
      <div className="flex-1 max-w-xl h-9 bg-white/20 rounded-lg animate-pulse" />
    </div>
  );
}

export default function ProductLoading() {
  return (
    <>
      <HeaderSkeleton />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mt-6 mb-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
            <div className="aspect-square rounded-[var(--radius-card)] bg-gray-200 animate-pulse" />
            <div className="flex flex-col gap-4 pt-2">
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-7 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-24 bg-gray-200 rounded-full animate-pulse" />
              <div className="space-y-2 mt-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
              </div>
              <div className="h-11 w-full md:w-48 bg-gray-200 rounded-[var(--radius-button)] animate-pulse mt-2" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
