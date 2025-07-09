import React from 'react';
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

const StarRating: React.FC<StarRatingProps> = ({ value, onChange, readOnly }) => {
    return (
        <StyledRating
            name="rating"
            value={value}
            onChange={readOnly ? undefined : ((_, newValue) => onChange && onChange(newValue))}
            readOnly={readOnly}
            emptyIcon={<Star />}
            icon={<Star fill="var(--color-primary-500)" />}
        />
    );
};

export default StarRating;
