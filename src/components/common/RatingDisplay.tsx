import React from 'react';

interface RatingDisplayProps {
    rating: number | null;
    className?: string;
    suffix?: string;
    min?: number;
    max?: number;
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({
    rating,
    className,
    suffix,
    min,
    max,
}) => {
    const isError =
        rating !== null &&
        ((typeof min === 'number' && rating < min) ||
            (typeof max === 'number' && rating > max));
    const colorClass = isError
        ? 'text-red-500 bg-red-100'
        : 'text-primary-500 bg-gray-200';
    if (suffix) {
        return (
            <span
                className={`text-sm font-medium flex justify-center rounded-sm px-2 ${colorClass} ${className || ''}`}
            >
                {rating !== null ? rating : ''}
                {suffix}
            </span>
        );
    }
    return (
        <span
            className={`text-sm font-medium flex justify-center rounded-sm px-2 ${colorClass} ${className || ''}`}
        >
            {rating !== null ? rating : '-'}
        </span>
    );
};

export default RatingDisplay;
