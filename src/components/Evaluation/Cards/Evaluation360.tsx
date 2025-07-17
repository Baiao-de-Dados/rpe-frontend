import { Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import type { Collaborator } from '../../../types/collaborator';

import StarRating from '../../common/StarRating';
import CardContainer from '../../common/CardContainer';
import RatingDisplay from '../../common/RatingDisplay';
import CollaboratorCard from '../../common/CollaboratorCard';
import TextAreaWithTitle from '../../common/TextAreaWithTitle';
import IAValidateActions from '../../common/IAValidateActions';
import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

interface Evaluation360Props {
    collaborator: Collaborator;
    onRemove: () => void;
    name: string;
    index: number;
}

const Evaluation360 = ({ collaborator, onRemove, name, index }: Evaluation360Props) => {

    const { control, setValue } = useFormContext();

    const { optimizedTransition } = useOptimizedAnimation();

    const watchedEvaluation360IAValid = useWatch({
        control,
        name: `evaluation360.${index}.evaluation360IAValid`
    });

    const handleCheck = () => {
        setValue(`evaluation360.${index}.evaluation360IAValid`, true, { shouldValidate: true });
    };

    const handleCancel = () => {
        setValue(`evaluation360.${index}.evaluation360IAValid`, true, { shouldValidate: true });
        setValue(`evaluation360.${index}.rating`, null);
        setValue(`evaluation360.${index}.strengths`, '');
        setValue(`evaluation360.${index}.improvements`, '');
    };

    return (
        <motion.div layout transition={optimizedTransition}>
            <CardContainer>
                <Controller name={`evaluation360.${index}.evaluation360IAValid`} control={control}
                    render={({ field }) => (
                        <input type="hidden" {...field} value={(watchedEvaluation360IAValid ?? true) ? 'true' : 'false'} />
                    )}
                />

                {!(watchedEvaluation360IAValid ?? true) && (
                    <IAValidateActions onCheck={handleCheck} onCancel={handleCancel} />
                )}

                <div className="flex items-center justify-between mb-4">
                <CollaboratorCard collaborator={collaborator} variant="compact"/>
                <div className="flex items-center gap-2">
                    <Controller name={`${name}.rating`} control={control}
                        render={({ field }) => (
                            <RatingDisplay rating={field.value} className="ml-auto"/>
                        )}
                    />
                    <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-700 cursor-pointer p-2">
                        <Trash size={20} />
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-700">
                        Dê uma avaliação de 1 a 5 ao colaborador
                    </p>
                </div>
                <Controller name={`${name}.rating`} control={control}
                    render={({ field }) => (
                        <StarRating value={field.value} onChange={value => { field.onChange(value); }}/>
                    )}
                />
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <Controller name={`${name}.strengths`} control={control}
                        render={({ field }) => (
                            <TextAreaWithTitle title="Pontos fortes" placeholder="Descreva os principais pontos fortes deste colaborador..." value={field.value || ''} onChange={field.onChange} maxLength={1000} />
                        )}
                    />
                </div>

                <div className="flex-1">
                    <Controller name={`${name}.improvements`} control={control}
                        render={({ field }) => (
                            <TextAreaWithTitle title="Pontos de melhoria" placeholder="Descreva os principais pontos de melhoria para este colaborador..." value={field.value || ''} onChange={field.onChange} maxLength={1000} />
                        )}
                    />
                </div>
            </div>
        </CardContainer>
        </motion.div>
    );
};

export default Evaluation360;
