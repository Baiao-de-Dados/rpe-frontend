export function PillarCardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow p-6 sm:p-8 min-w-[90vw] max-w-xs sm:min-w-[260px] sm:max-w-none min-h-[110px] sm:min-h-[140px] flex flex-col items-center justify-center border border-gray-200 animate-pulse">
            <div className="h-5 w-24 bg-gray-200 rounded mb-3" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
    );
}
