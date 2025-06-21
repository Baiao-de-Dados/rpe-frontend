import React from 'react';
import { Trash } from 'lucide-react';
import CardContainer from '../../CardContainer';
import CollaboratorCard from '../../CollaboratorCard';
import TextAreaWithTitle from '../../TextAreaWithTitle';
import StarRating from '../../StarRating';
import RatingDisplay from '../../RatingDisplay';
import { ErrorMessage } from '../../ErrorMessage';
import { Controller, useFormContext } from 'react-hook-form';
import type { Collaborator } from '../../../data/mockCollaborators';

interface Evaluation360Props {
    collaborator: Collaborator;
    onRemove: () => void;
    name: string;
}

const Evaluation360: React.FC<Evaluation360Props> = ({
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
                <div className="flex items-center gap-2">
                    <Controller
                        name={`${name}.rating`}
                        control={control}
                        render={({ field }) => (
                            <RatingDisplay
                                rating={field.value}
                                className="ml-auto"
                            />
                        )}
                    />
                    <button
                        type="button"
                        onClick={onRemove}
                        className="text-red-500 hover:text-red-700 cursor-pointer p-2"
                    >
                        <Trash size={20} />
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-700">
                        Dê uma avaliação de 1 a 5 ao colaborador
                    </p>
                    <Controller
                        name={`${name}.rating`}
                        control={control}
                        render={({ fieldState }) => (
                            <ErrorMessage error={fieldState.error?.message} />
                        )}
                    />
                </div>
                <Controller
                    name={`${name}.rating`}
                    control={control}
                    render={({ field }) => (
                        <StarRating
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <Controller
                        name={`${name}.strengths`}
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextAreaWithTitle
                                title="Pontos fortes"
                                placeholder="Descreva os principais pontos fortes deste colaborador..."
                                value={field.value || ''}
                                onChange={field.onChange}
                                maxLength={1000}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                </div>

                <div className="flex-1">
                    <Controller
                        name={`${name}.improvements`}
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextAreaWithTitle
                                title="Pontos de melhoria"
                                placeholder="Descreva os principais pontos de melhoria para este colaborador..."
                                value={field.value || ''}
                                onChange={field.onChange}
                                maxLength={1000}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                </div>
            </div>
        </CardContainer>
    );
};

export default Evaluation360;
