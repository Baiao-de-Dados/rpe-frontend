import React from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

interface StarRatingProps {
    value: number | null;
    onChange: (newValue: number | null) => void;
}

const StyledRating = styled(Rating)({
    '& .MuiRating-icon': {
        fontSize: '1.7rem',
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

const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
    return (
        <StyledRating
            name="rating"
            value={value}
            onChange={(_, newValue) => onChange(newValue)}
        />
    );
};

export default StarRating;
