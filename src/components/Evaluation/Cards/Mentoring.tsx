import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';

import StarRating from '../../common/StarRating';
import Typography from '../../common/Typography';
import RatingDisplay from '../../common/RatingDisplay';
import CardContainer from '../../common/CardContainer';
import CollaboratorCard from '../../common/CollaboratorCard';
import IAValidateActions from '../../common/IAValidateActions';
import TextAreaWithTitle from '../../common/TextAreaWithTitle';

import { useCycleNetworkQuery } from '../../../hooks/api/useCollaboratorQuery';
import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

const Mentoring = () => {

    const { data: networkData, isLoading: isNetworkLoading } = useCycleNetworkQuery();
    const mentor = networkData?.mentor;

    const { control, setValue } = useFormContext();

    const { optimizedTransition } = useOptimizedAnimation();

    const watchedMentoringIAValid = useWatch({
        control,
        name: 'mentoringIAValid'
    });

    useEffect(() => {
        if (!mentor) return;
        setValue('mentorId', mentor.id);
        if (watchedMentoringIAValid === undefined) {
            setValue('mentoringIAValid', true, { shouldValidate: true });
        }
    }, [setValue, watchedMentoringIAValid, mentor]);

    const handleCheck = () => {
        setValue('mentoringIAValid', true, { shouldValidate: true });
    };

    const handleCancel = () => {
        setValue('mentoringIAValid', true, { shouldValidate: true });
        setValue('mentoringRating', null);
        setValue('mentoringJustification', '');
    };

    if (isNetworkLoading) {
        return (
            <div className="flex justify-center items-center py-8">
                <Loader2 className="animate-spin h-8 w-8 text-primary-500" />
            </div>
        );
    }
    if (!mentor) {
        return (
            <div className="text-center py-12">
                <Typography variant="body" className="text-gray-500">
                    Mentor não encontrado
                </Typography>
            </div>
        );
    }

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
                render={({ field }) => (
                    <>
                        <div className="flex items-center gap-4 mb-4">
                            <CollaboratorCard collaborator={mentor} variant="compact"/>
                            <RatingDisplay rating={field.value || null} className="ml-auto"/>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <Typography variant="body" className="text-sm text-gray-600">
                                Dê uma avaliação de 1 à 5 ao seu mentor
                            </Typography>
                        </div>
                        <div className="mb-4">
                            <StarRating value={field.value || null} onChange={value => { field.onChange(value); }}/>
                        </div>
                    </>
                )}
            />

            <Controller name="mentoringJustification" control={control}
                render={({ field }) => (
                    <TextAreaWithTitle 
                        title="Justifique sua nota" 
                        placeholder="Justifique sua nota" 
                        maxLength={1000} 
                        value={field.value || ''} 
                        onChange={field.onChange} 
                    />
                )}
            />
        </CardContainer>
        </motion.div>
    );
};

export default Mentoring;
