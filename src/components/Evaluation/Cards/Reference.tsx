import React from 'react';
import { useFormContext } from 'react-hook-form';
import CollaboratorCard from '../../CollaboratorCard';
import TextAreaWithTitle from '../../TextAreaWithTitle';
import { Trash } from 'lucide-react';
import { type Collaborator } from '../../../data/mockCollaborators';
import CardContainer from '../../CardContainer';

interface ReferenceProps {
    collaborator: Collaborator;
    onClearReference: (collaboratorId: string) => void;
}

const Reference: React.FC<ReferenceProps> = ({
    collaborator,
    onClearReference,
}) => {
    const {
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();

    const fieldName = `reference.${collaborator.id}`;

    const referencia = watch(fieldName) ?? '';

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(fieldName, e.target.value);
    };

    return (
        <CardContainer>
            <div className="flex items-center justify-between mb-6">
                <CollaboratorCard
                    collaborator={collaborator}
                    variant="detailed"
                />
                <button
                    title="Apagar referência"
                    onClick={() => onClearReference(collaborator.id)}
                >
                    <Trash
                        className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700"
                        strokeWidth={2}
                    />
                </button>
            </div>

            <div className="mb-6">
                <TextAreaWithTitle
                    title="Justifique sua escolha"
                    placeholder="Justifique sua escolha"
                    value={referencia}
                    onChange={handleChange}
                    error={
                        errors?.reference &&
                        typeof errors.reference === 'object' &&
                        collaborator.id in errors.reference
                            ? (
                                  errors.reference[
                                      collaborator.id as keyof typeof errors.reference
                                  ] as { message?: string }
                              )?.message
                            : undefined
                    }
                    showCharCount
                    minLength={10}
                    maxLength={1000}
                />
            </div>
        </CardContainer>
    );
};

export default Reference;
