import React from 'react';
import { Trash } from 'lucide-react';
import CardContainer from '../../CardContainer';
import CollaboratorCard from '../../CollaboratorCard';
import TextAreaWithTitle from '../../TextAreaWithTitle';
import { Controller, useFormContext } from 'react-hook-form';
import type { Collaborator } from '../../../data/mockCollaborators';

interface ReferenceProps {
    collaborator: Collaborator;
    onRemove: () => void;
    name: string;
}

const Reference: React.FC<ReferenceProps> = ({
    collaborator,
    onRemove,
    name,
}) => {
    const { control } = useFormContext();

    return (
        <CardContainer>
            <div className="flex items-center justify-between mb-4">
                <CollaboratorCard
                    collaborator={collaborator}
                    variant="compact"
                />
                <button
                    type="button"
                    onClick={onRemove}
                    className="text-red-500 hover:text-red-700 cursor-pointer p-2"
                >
                    <Trash size={20} />
                </button>
            </div>
            <div>
                <Controller
                    name={name}
                    control={control}
                    rules={{
                        required: 'A justificativa é obrigatória',
                        minLength: {
                            value: 10,
                            message:
                                'A justificativa deve ter pelo menos 10 caracteres',
                        },
                        maxLength: {
                            value: 1000,
                            message:
                                'A justificativa deve ter no máximo 1000 caracteres',
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <TextAreaWithTitle
                            title="Justifique sua escolha"
                            placeholder="Escreva sobre este colaborador como referência..."
                            value={field.value || ''}
                            onChange={field.onChange}
                            showCharCount
                            minLength={10}
                            maxLength={1000}
                            error={fieldState.error?.message}
                        />
                    )}
                />
            </div>
        </CardContainer>
    );
};

export default Reference;
