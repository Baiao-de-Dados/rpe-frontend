import { Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import CardContainer from '../../common/CardContainer';
import CollaboratorCard from '../../common/CollaboratorCard';
import TextAreaWithTitle from '../../common/TextAreaWithTitle';
import IAValidateActions from '../../common/IAValidateActions';

import type { Collaborator } from '../../../types/collaborator';

import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

interface ReferenceProps {
    collaborator: Collaborator;
    onRemove: () => void;
    name: string;
    index: number;
}

const Reference = ({ collaborator, onRemove, name, index }: ReferenceProps) => {

    const { control, setValue } = useFormContext();

    const { optimizedTransition } = useOptimizedAnimation();

    const watchedReferenceIAValid = useWatch({
        control,
        name: `references.${index}.referencesIAValid`
    });

    const handleCheck = () => {
        setValue(`references.${index}.referencesIAValid`, true, { shouldValidate: true });
    };

    const handleCancel = () => {
        setValue(`references.${index}.referencesIAValid`, true, { shouldValidate: true });
        setValue(`references.${index}.justification`, '');
    };

    return (
        <motion.div layout transition={optimizedTransition}>
            <CardContainer>
                <Controller name={`references.${index}.referencesIAValid`} control={control}
                    render={({ field }) => (
                        <input type="hidden" {...field} value={(watchedReferenceIAValid ?? true) ? 'true' : 'false'} />
                    )}
                />

                {!(watchedReferenceIAValid ?? true) && (
                    <IAValidateActions onCheck={handleCheck} onCancel={handleCancel} />
                )}

                <div className="flex items-center justify-between mb-4">
                <CollaboratorCard collaborator={collaborator} variant="compact"/>
                <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-700 cursor-pointer p-2">
                    <Trash size={20} />
                </button>
            </div>
            <div>
                <Controller name={name} control={control}
                    render={({ field }) => (
                        <TextAreaWithTitle 
                            title="Justifique sua escolha" 
                            placeholder="Escreva sobre este colaborador como referência..."
                            value={field.value || ''} 
                            onChange={field.onChange} 
                            maxLength={1000} 
                        />
                    )}
                />
            </div>
        </CardContainer>
        </motion.div>
    );
};

export default Reference;
