import { useState } from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { Star } from 'lucide-react';

interface StarRatingProps {
    value: number | null;
    onChange?: (newValue: number | null) => void;
    readOnly?: boolean;
}

const StyledRating = styled(Rating)({
    '& .MuiRating-icon': {
        fontSize: '1.7rem',
        margin: '0 0.5rem 0 0',
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
});

const STAR_LABELS = [
    '', 
    'Ruim',
    'Regular',
    'Bom',
    'Muito bom',
    'Excelente',
];

function StarRating({ value, onChange, readOnly }: StarRatingProps) {
    const [hover, setHover] = useState<number | null>(null);

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
            />
            <span className="min-w-[90px] ml-1 mt-1 text-primary-500 text-[0.95rem] flex-shrink-0 leading-none">
                {hover ? STAR_LABELS[hover] : value ? STAR_LABELS[value] : ''}
            </span>
        </div>
    );
}

export default StarRating;
