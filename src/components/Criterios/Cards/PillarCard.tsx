export function PillarCard({
    title,
    criteriaCount,
}: {
    title: string;
    criteriaCount: number;
}) {
    return (
        <div className="bg-white rounded-xl shadow p-6 sm:p-8 min-w-[90vw] max-w-xs sm:min-w-[260px] sm:max-w-none min-h-[110px] sm:min-h-[140px] flex flex-col items-center justify-center border border-gray-200 hover:shadow-md transition-all duration-200 hover:cursor-pointer">
            <div className="text-base sm:text-lg font-semibold mb-2 text-primary-500">
                {title}
            </div>
            <div className="text-gray-500 text-xs sm:text-sm">
                {criteriaCount} {criteriaCount === 1 ? 'Critério' : 'Critérios'}
            </div>
        </div>
    );
}
