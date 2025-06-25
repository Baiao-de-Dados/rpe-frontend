import React from 'react';

interface RatingDisplayProps {
    rating: number | null;
    className?: string;
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({ rating, className }) => {
    return (
        <span
            className={`w-8 text-sm font-medium text-primary-500 bg-gray-200 flex justify-center rounded-sm ${className}`}
        >
            {rating ?? '-'}
        </span>
    );
};

export default RatingDisplay;
