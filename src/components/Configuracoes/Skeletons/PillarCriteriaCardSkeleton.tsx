export function PillarCriteriaCardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-lg p-4 pt-6 sm:p-8 w-full relative animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
            <div className="divide-y divide-gray-200 overflow-y-auto pr-2 space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
                ))}
            </div>
        </div>
    );
}
