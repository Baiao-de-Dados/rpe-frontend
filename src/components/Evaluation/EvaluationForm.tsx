import { useFormContext } from 'react-hook-form';
import CardContainer from '../CardContainer';
import CollaboratorCard from '../CollaboratorCard';
import RatingDisplay from '../RatingDisplay';
import StarRating from '../StarRating';
import TextAreaWithTitle from '../TextAreaWithTitle';
import Typography from '../Typography';
import { ErrorMessage } from '../ErrorMessage';

export function EvaluationForm() {
    const {
        watch,
        setValue,
        formState: { errors, isSubmitted },
    } = useFormContext();

    const currentRating = watch('mentoringRating');
    const currentJustification = watch('mentoringJustification');

    const handleRatingChange = (rating: number | null) => {
        setValue('mentoringRating', rating, { shouldValidate: true });
    };

    return (
        <>
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
                    <RatingDisplay
                        rating={currentRating || null}
                        className="ml-auto"
                    />
                </div>
                <div className="flex items-center justify-between mb-2">
                    <Typography
                        variant="body"
                        className="text-sm text-gray-600"
                    >
                        Dê uma avaliação de 1 à 5 ao seu mentor
                    </Typography>
                    <ErrorMessage
                        error={errors.mentoringRating?.message as string}
                        show={isSubmitted}
                    />
                </div>
                <div className="mb-4">
                    <StarRating
                        value={currentRating || null}
                        onChange={handleRatingChange}
                    />
                </div>
                <div>
                    <TextAreaWithTitle
                        title="Justifique sua nota"
                        placeholder="Justifique sua nota"
                        minLength={10}
                        maxLength={1000}
                        showCharCount
                        value={currentJustification}
                        onChange={e =>
                            setValue('mentoringJustification', e.target.value, {
                                shouldValidate: true,
                            })
                        }
                        error={
                            isSubmitted
                                ? (errors.mentoringJustification
                                      ?.message as string)
                                : undefined
                        }
                    />
                </div>
            </CardContainer>
        </>
    );
}
