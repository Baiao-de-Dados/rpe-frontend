import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { RequiredSwitch } from './RequiredSwitch';
import TextAreaWithTitle from '../common/TextAreaWithTitle';
import InputWithTitle from '../common/InputWithTitle';

interface EditableCriterionProps {
    criterion: {
        id: string;
        name: string;
        weight?: string;
        description?: string;
        required?: boolean;
    };
    isCycleClosed?: boolean;
}

export function EditableCriterion({
    criterion,
    isCycleClosed = false,
}: EditableCriterionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [required, setRequired] = useState(criterion.required ?? true);
    const [name, setName] = useState(criterion.name);
    const [weight, setWeight] = useState(criterion.weight || '');
    const [description, setDescription] = useState(criterion.description || '');

    return (
        <div className="bg-white border-b border-gray-200 last:border-b-0">
            <div
                className="flex items-center justify-between p-4 pl-0 cursor-pointer"
                onClick={() => setIsOpen(v => !v)}
            >
                <span className="font-semibold text-gray-800">
                    {criterion.name}
                </span>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">
                        Campo obrigatório
                    </span>
                    <RequiredSwitch
                        value={required}
                        onChange={setRequired}
                        disabled={!isCycleClosed}
                    />
                    <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    >
                        <ChevronDown size={24} />
                    </div>
                </div>
            </div>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-4 pl-0 pt-0 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:p-4 sm:pl-0 sm:pt-0">
                    <div>
                        <InputWithTitle
                            title="Nome do Critério"
                            value={name}
                            readOnly={!isCycleClosed}
                            onChange={e => setName(e.target.value)}
                            maxLength={100}
                        />
                    </div>
                    <div>
                        <InputWithTitle
                            title="Peso"
                            value={weight}
                            placeholder="%"
                            readOnly={!isCycleClosed}
                            onChange={e => setWeight(e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <TextAreaWithTitle
                            title="Descrição"
                            placeholder="Descrição do critério"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            readOnly={!isCycleClosed}
                            maxLength={500}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
