import React from 'react';
import { useFormContext } from 'react-hook-form';
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

const Mentoring: React.FC<MentoringProps> = () => {
    const {
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();

    const rating = watch('mentoringRating') ?? 0;
    const justification = watch('mentoringJustification') ?? '';

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
            <div className="flex items-center justify-between mb-2">
                <Typography variant="body" className="text-sm text-gray-600">
                    Dê uma avaliação de 1 à 5 ao seu mentor
                </Typography>
                {errors.mentoringRating && (
                    <Typography variant="body" className="text-sm text-red-500">
                        {errors.mentoringRating.message as string}
                    </Typography>
                )}
            </div>
            <div className="mb-4">
                <StarRating
                    value={rating}
                    onChange={newValue => setValue('mentoringRating', newValue)}
                />
            </div>
            <div>
                <TextAreaWithTitle
                    title="Justifique sua nota"
                    placeholder="Justifique sua nota (mínimo 10 caracteres)"
                    value={justification}
                    onChange={e =>
                        setValue('mentoringJustification', e.target.value)
                    }
                    error={errors.mentoringJustification?.message as string}
                    showCharCount={true}
                    minLength={10}
                    maxLength={1000}
                />
            </div>
        </CardContainer>
    );
};

export default Mentoring;
