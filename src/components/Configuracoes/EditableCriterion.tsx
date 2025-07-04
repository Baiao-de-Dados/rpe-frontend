import { ActiveSwitch } from './ActiveSwitch';

import RatingDisplay from '../common/RatingDisplay';
import InputWithTitle from '../common/InputWithTitle';

import { normalizeCriterionWeight } from './Sections/utils/trackUtils';

interface EditableCriterionProps {
    value: {
        id: number;
        name: string;
        weight?: string;
        description?: string;
        isActive?: boolean;
    };
    onChange: (value: { 
        id: number; 
        name: string; 
        weight?: string; 
        description?: string; 
        isActive?: boolean 
    }) => void;
    isCycleClosed?: boolean;
    error?: string;
}

export function EditableCriterion({ value, onChange, isCycleClosed = false, error }: EditableCriterionProps) {

    const handleActiveChange = (val: boolean) => {
        onChange({ ...value, isActive: val });
    };

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = normalizeCriterionWeight(e.target.value);
        onChange({ ...value, weight: val });
    };

    return (
        <div className="bg-white border-b border-gray-200 last:border-b-0">
            <div className="p-4 pl-0">
                <div className="flex items-center justify-between mb-3 sm:mb-0">
                    <span className="font-semibold text-primary-500 text-sm sm:text-base flex items-center gap-2">
                        {value.name}
                        {value.isActive && (
                            <span className="hidden sm:inline">
                                <RatingDisplay rating={value.weight ? Number(value.weight) : null} suffix="%" min={1} max={100} className={!value.weight ? 'text-red-500 bg-red-100' : ''} />
                            </span>
                        )}
                    </span>
                    <div className="flex items-center gap-4">
                        {value.isActive && (
                            <div className="hidden sm:flex items-center gap-2">
                                <InputWithTitle title="Peso" value={value.weight || ''} placeholder="%" readOnly={!isCycleClosed} onChange={handleWeightChange} width="5" height="2" labelPosition="left" inputType="number" onlyInteger error={error}/>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                                <span className="hidden sm:inline">{value.isActive ? 'Desativar' : 'Ativar'}</span>
                                <ActiveSwitch value={!!value.isActive} onChange={handleActiveChange} disabled={!isCycleClosed} />
                            </label>
                        </div>
                    </div>
                </div>
                
                {value.isActive && (
                    <div className="block sm:hidden">
                        <InputWithTitle title="Peso" value={value.weight || ''} placeholder="%" readOnly={!isCycleClosed} onChange={handleWeightChange} width="100%" height="2" labelPosition="left" inputType="number" onlyInteger error={error}/>
                    </div>
                )}
            </div>
        </div>
    );
}
