import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import StarRating from '../../StarRating';
import TextAreaWithTitle from '../../TextAreaWithTitle';
import Typography from '../../Typography';
import CollaboratorCard from '../../CollaboratorCard';
import RatingDisplay from '../../RatingDisplay';
import CardContainer from '../../CardContainer';
import { ErrorMessage } from '../../ErrorMessage';

const Mentoring: React.FC = () => {
    const { control, setValue } = useFormContext();

    const [isIAValid, setIsIAValid] = React.useState(false);

    const mentor = {
        id: '3',
        nome: 'Fulano de Tal',
        cargo: 'Mentor',
    };

    useEffect(() => {
        setValue('mentorId', mentor.id);
    }, [setValue, mentor.id]);

    useEffect(() => {
        setValue('mentoringIAValid', isIAValid, { shouldValidate: true });
    }, [isIAValid, setValue]);

    return (
        <CardContainer>
            <Controller
                name="mentoringIAValid"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <input type="hidden" {...field} value={isIAValid ? 'true' : 'false'} />
                )}
            />

            <Controller
                name="mentorId"
                control={control}
                render={({ field }) => (
                    <input type="hidden" {...field} value={mentor.id} />
                )}
            />

            <Controller
                name="mentoringRating"
                control={control}
                render={({ field, fieldState }) => (
                    <>
                        <div className="flex items-center gap-4 mb-4">
                            <CollaboratorCard
                                collaborator={mentor}
                                variant="compact"
                            />
                            <RatingDisplay
                                rating={field.value || null}
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
                            <ErrorMessage error={fieldState.error?.message} />
                        </div>
                        <div className="mb-4">
                            <StarRating
                                value={field.value || null}
                                onChange={field.onChange}
                            />
                        </div>
                    </>
                )}
            />

            <Controller
                name="mentoringJustification"
                control={control}
                render={({ field, fieldState }) => (
                    <TextAreaWithTitle
                        title="Justifique sua nota"
                        placeholder="Justifique sua nota"
                        maxLength={1000}
                        value={field.value || ''}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                    />
                )}
            />
        </CardContainer>
    );
};

export default Mentoring;
