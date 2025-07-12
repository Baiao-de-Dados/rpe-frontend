import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFormContext, Controller, useWatch } from 'react-hook-form';

import StarRating from '../../common/StarRating';
import Typography from '../../common/Typography';
import RatingDisplay from '../../common/RatingDisplay';
import CardContainer from '../../common/CardContainer';
import { ErrorMessage } from '../../common/ErrorMessage';
import CollaboratorCard from '../../common/CollaboratorCard';
import IAValidateActions from '../../common/IAValidateActions';
import TextAreaWithTitle from '../../common/TextAreaWithTitle';
import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

const mentor = {
    id: 1,
    nome: 'Miguel Alencar',
    cargo: 'Mentor',
};

const Mentoring = () => {

    const { control, setValue } = useFormContext();
    const { optimizedTransition } = useOptimizedAnimation();

    const watchedMentoringIAValid = useWatch({
        control,
        name: 'mentoringIAValid'
    });

    useEffect(() => {
        setValue('mentorId', mentor.id);
        if (watchedMentoringIAValid === undefined) {
            setValue('mentoringIAValid', true, { shouldValidate: true });
        }
    }, [setValue, watchedMentoringIAValid]);

    const handleCheck = () => {
        setValue('mentoringIAValid', true, { shouldValidate: true });
    };

    const handleCancel = () => {
        setValue('mentoringIAValid', true, { shouldValidate: true });
        setValue('mentoringRating', null);
        setValue('mentoringJustification', '');
    };

    return (
        <motion.div layout transition={optimizedTransition}>
            <CardContainer>
                <Controller
                    name="mentoringIAValid"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <input type="hidden" {...field} value={(watchedMentoringIAValid ?? true) ? 'true' : 'false'} />
                    )}
                />

                {!(watchedMentoringIAValid ?? true) && (
                    <IAValidateActions onCheck={handleCheck} onCancel={handleCancel} />
                )}

                <Controller name="mentorId" control={control}
                    render={({ field }) => (
                        <input type="hidden" {...field} value={mentor.id} />
                    )}
                />

            <Controller name="mentoringRating" control={control}
                render={({ field, fieldState }) => (
                    <>
                        <div className="flex items-center gap-4 mb-4">
                            <CollaboratorCard collaborator={mentor} variant="compact"/>
                            <RatingDisplay rating={field.value || null} className="ml-auto"/>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <Typography variant="body" className="text-sm text-gray-600">
                                Dê uma avaliação de 1 à 5 ao seu mentor
                            </Typography>
                            <ErrorMessage error={fieldState.error?.message} />
                        </div>
                        <div className="mb-4">
                            <StarRating value={field.value || null} onChange={field.onChange}/>
                        </div>
                    </>
                )}
            />

            <Controller name="mentoringJustification" control={control}
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
        </motion.div>
    );
};

export default Mentoring;
