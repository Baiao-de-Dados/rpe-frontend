interface RatingDisplayProps {
    rating: number | null;
    className?: string;
    suffix?: string;
    min?: number;
    max?: number;
    pillar?: boolean;
    final?: boolean;
}

function RatingDisplay({
    rating,
    className,
    suffix,
    min,
    max,
    pillar = false,
    final = false,
}: RatingDisplayProps) {
    const isError =
        rating !== null &&
        ((typeof min === 'number' && rating < min) ||
            (typeof max === 'number' && rating > max));
    const colorClass = isError
        ? 'text-red-500 bg-red-100'
        : final
            ? 'text-white bg-primary-500'
            : 'text-primary-500 bg-gray-200';
    const sizeClass = pillar ? 'text-base font-extrabold px-4 py-1 text-[1rem]' : 'text-sm px-3 py-0.5';

    if (suffix) {
        return (
            <span className={`font-bold flex justify-center rounded-sm ${sizeClass} ${colorClass} ${className || ''}`}>
                {rating !== null ? rating : ''}
                {suffix}
            </span>
        );
    }
    return (
        <span title={pillar ? final ? 'Nota média final' : 'Sua média' : ''} className={`font-bold flex justify-center rounded-sm ${sizeClass} ${colorClass} ${className || ''}`}>
            {rating !== null ? rating : '-'}
        </span>
    );
}

export default RatingDisplay;
