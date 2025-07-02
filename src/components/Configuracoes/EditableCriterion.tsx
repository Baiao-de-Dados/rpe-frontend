import { ActiveSwitch } from './ActiveSwitch';
import InputWithTitle from '../common/InputWithTitle';
import RatingDisplay from '../common/RatingDisplay';

interface EditableCriterionProps {
    value: {
        id: number;
        name: string;
        weight?: string;
        description?: string;
        isActive?: boolean;
    };
    onChange: (value: { id: number; name: string; weight?: string; description?: string; isActive?: boolean }) => void;
    isCycleClosed?: boolean;
    error?: string;
}

export function EditableCriterion({ value, onChange, isCycleClosed = false, error }: EditableCriterionProps) {
    const handleActiveChange = (val: boolean) => {
        onChange({ ...value, isActive: val });
    };
    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        if (val) {
            let num = Number(val);
            if (!isNaN(num)) {
                num = Math.trunc(num);
                if (num > 100) {
                    num = 100;
                } else if (num < 1) {
                    num = 1;
                }
                val = String(num);
            }
        }
        onChange({ ...value, weight: val });
    };
    return (
        <div className="bg-white border-b border-gray-200 last:border-b-0">
            <div className="flex items-center justify-between p-4 pl-0">
                <span className="font-semibold text-gray-800 text-sm sm:text-base flex items-center gap-2">
                    {value.name}
                    {value.isActive && (
                        <span className="hidden sm:inline">
                            <RatingDisplay rating={value.weight ? Number(value.weight) : null} suffix="%" min={1} max={100} className={!value.weight ? 'text-red-500 bg-red-100' : ''} />
                        </span>
                    )}
                </span>
                <div className="flex items-center gap-4">
                    {value.isActive && (
                        <div className="flex items-center gap-2">
                            <InputWithTitle title="Peso" value={value.weight || ''} placeholder="%" readOnly={!isCycleClosed} onChange={handleWeightChange} width="5" height="2" labelPosition="left" inputType="number" onlyInteger error={error} />
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                            <span>{value.isActive ? 'Desativar' : 'Ativar'}</span>
                            <ActiveSwitch value={!!value.isActive} onChange={handleActiveChange} disabled={!isCycleClosed} />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
