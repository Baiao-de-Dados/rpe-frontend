import React from 'react';
import StarRating from '../../StarRating';
import TextAreaWithTitle from '../../TextAreaWithTitle';
import Typography from '../../Typography';
import CollaboratorCard from '../../CollaboratorCard';
import RatingDisplay from '../../RatingDisplay';
import CardContainer from '../../CardContainer';

interface MentoringProps {
    rating: number | null;
    justification: string;
    onRatingChange: (rating: number | null) => void;
    onJustificationChange: (justification: string) => void;
}

const Mentoring: React.FC<MentoringProps> = ({
    rating,
    justification,
    onRatingChange,
    onJustificationChange,
}) => {
    return (
        <CardContainer>
            <div className="flex items-center gap-4 mb-4">
                <CollaboratorCard
                    collaborator={{
                        id: '1',
                        nome: 'Fulano de Tal',
                        cargo: 'Mentor',
                    }}
                    variant="compact"
                />
                <RatingDisplay rating={rating} className="ml-auto" />
            </div>
            <Typography variant="body" className="text-sm text-gray-600 mb-2">
                Dê uma avaliação de 1 à 5 ao seu mentor
            </Typography>
            <div className="mb-4">
                <StarRating value={rating} onChange={onRatingChange} />
            </div>
            <TextAreaWithTitle
                title="Justifique sua nota"
                placeholder="Justifique sua nota"
                value={justification}
                onChange={e => onJustificationChange(e.target.value)}
            />
        </CardContainer>
    );
};

export default Mentoring;
