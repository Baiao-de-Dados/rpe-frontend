import { useState } from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { Star } from 'lucide-react';

interface StarRatingProps {
    value: number | null;
    onChange?: (newValue: number | null) => void;
    readOnly?: boolean;
    final?: boolean;
}

const StyledRating = styled(Rating, {
    shouldForwardProp: (prop) => prop !== '$readonlyStyle',
})<{ $readonlyStyle?: boolean }>(({ $readonlyStyle }) => ({
    '& .MuiRating-icon': {
        fontSize: '1.7rem',
        margin: '0 0.5rem 0 0',
        opacity: $readonlyStyle ? 0.7 : 1,
        filter: $readonlyStyle ? 'grayscale(0.5)' : 'none',
        transition: 'opacity 0.2s, filter 0.2s',
    },
    '& .MuiRating-iconFilled': {
        color: 'var(--color-primary-500)',
    },
    '& .MuiRating-iconHover': {
        color: 'var(--color-primary-500)',
    },
    '& .MuiRating-iconEmpty': {
        color: 'var(--color-primary-500)',
    },
}));

const STAR_LABELS = [
    '', 
    'Ruim',
    'Regular',
    'Bom',
    'Muito bom',
    'Excelente',
];

function StarRating({ value, onChange, readOnly, final }: StarRatingProps) {
    const [hover, setHover] = useState<number | null>(null);
    const readonlyStyle = !!readOnly && !final;

    return (
        <div className="flex items-center">
            <StyledRating
                name="rating"
                value={value}
                onChange={readOnly ? undefined : ((_, newValue) => onChange && onChange(newValue))}
                readOnly={readOnly}
                emptyIcon={<Star />}
                icon={<Star fill="var(--color-primary-500)" />}
                onChangeActive={(_event, newHover) => setHover(newHover)}
                onMouseLeave={() => setHover(null)}
                $readonlyStyle={readonlyStyle}
            />
            <span className="min-w-[90px] ml-1 mt-1 text-primary-500 text-[0.95rem] flex-shrink-0 leading-none">
                {hover ? STAR_LABELS[hover] : value ? STAR_LABELS[value] : ''}
            </span>
        </div>
    );
}

export default StarRating;
