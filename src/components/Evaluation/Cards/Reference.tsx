import { Trash } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import CardContainer from '../../common/CardContainer';
import CollaboratorCard from '../../common/CollaboratorCard';
import TextAreaWithTitle from '../../common/TextAreaWithTitle';

import type { Collaborator } from '../../../data/mockCollaborators';

interface ReferenceProps {
    collaborator: Collaborator;
    onRemove: () => void;
    name: string;
}

const Reference = ({ collaborator, onRemove, name }: ReferenceProps) => {

    const { control } = useFormContext();

    return (
        <CardContainer>
            <div className="flex items-center justify-between mb-4">
                <CollaboratorCard collaborator={collaborator} variant="compact"/>
                <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-700 cursor-pointer p-2">
                    <Trash size={20} />
                </button>
            </div>
            <div>
                <Controller name={name} control={control}
                    render={({ field, fieldState }) => (
                        <TextAreaWithTitle title="Justifique sua escolha" placeholder="Escreva sobre este colaborador como referência..."value={field.value || ''} onChange={field.onChange} maxLength={1000} error={fieldState.error?.message}/>
                    )}
                />
            </div>
        </CardContainer>
    );
};

export default Reference;
