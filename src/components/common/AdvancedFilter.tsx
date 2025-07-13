import { useState } from 'react';
import { Filter, X, ArrowDownWideNarrow } from 'lucide-react';
import Slider from '@mui/material/Slider';

interface Filters {
    pending: boolean;
    completed: boolean;
    orderDesc: boolean;
    orderAsc: boolean;
    scoreRange: [number, number];
    [key: string]: boolean | [number, number];
}

type BooleanFilterKey = Exclude<keyof Filters, 'scoreRange'>;

interface AdvancedFilterProps {
    className?: string;
    positions?: string[];
    tracks?: string[];
    onApply: (filters: Filters) => void;
}

function createInitialFilters(positions: string[] = [], tracks: string[] = []): Filters {
    return {
        pending: true,
        completed: true,
        orderDesc: true,
        orderAsc: false,
        scoreRange: [0, 5],
        ...Object.fromEntries(positions.map(pos => [pos, true])),
        ...Object.fromEntries(tracks.map(track => [track, true])),
    };
}

export default function AdvancedFilter({ className, positions = [], tracks = [], onApply }: AdvancedFilterProps) {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState<Filters>(() => createInitialFilters(positions, tracks));

    const marks = Array.from({ length: 6 }, (_, i) => ({
        value: i,
        label: `${i}`,
    }));

    const handleCheckboxChange = (name: BooleanFilterKey) => {
        setFilters(prev => {
            const updated = { ...prev, [name]: !prev[name] };
            onApply(updated);
            return updated;
        });
    };

    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setFilters(prev => {
                const updated = { ...prev, scoreRange: newValue as [number, number] };
                onApply(updated);
                return updated;
            });
        }
    };

    const toggleOrder = () => {
        setFilters(prev => {
            const updated = {
                ...prev,
                orderDesc: !prev.orderDesc,
                orderAsc: prev.orderDesc,
            };
            onApply(updated);
            return updated;
        });
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) setOpen(false);
    };

    return (
        <div className={className}>
            <button
                className="bg-[#167174] cursor-pointer hover:bg-[#125c5e] transition-colors rounded-xl p-3 flex items-center justify-center w-[48px] min-w-[48px] max-w-[60px] sm:w-auto sm:min-w-0 sm:max-w-none"
                onClick={() => setOpen(prev => !prev)}
            >
                <Filter className="text-white w-4 h-4" />
            </button>
            {open && (
                <div onClick={handleOverlayClick} className="absolute right-0 top-15 z-50">
                    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-[310px] max-w-sm relative">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold text-lg text-gray-700">Filtros Avançados</span>
                            <button onClick={() => setOpen(false)}>
                                <X className="w-5 h-5 text-gray-500 hover:text-gray-800 cursor-pointer" />
                            </button>
                        </div>
                        <form className="flex flex-col gap-4">
                            <label className="flex items-center justify-between gap-3 text-gray-700 cursor-pointer select-none">
                                Pendentes
                                <span className={`w-5 h-5 border rounded-sm flex items-center justify-center ${filters.pending ? 'bg-[#167174] border-[#167174]' : 'border-gray-400'}`}>
                                    {filters.pending && (
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </span>
                                <input type="checkbox" checked={filters.pending} onChange={() => handleCheckboxChange('pending')} className="hidden" />
                            </label>
                            <label className="flex items-center justify-between gap-3 text-gray-700 cursor-pointer select-none">
                                Finalizados
                                <span className={`w-5 h-5 border rounded-sm flex items-center justify-center ${filters.completed ? 'bg-[#167174] border-[#167174]' : 'border-gray-400'}`}>
                                    {filters.completed && (
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </span>
                                <input type="checkbox" checked={filters.completed} onChange={() => handleCheckboxChange('completed')} className="hidden" />
                            </label>
                            <div className="flex flex-col justify-center text-gray-700 gap-2">
                                Cargos
                                <div className="pl-8 max-h-12 overflow-y-auto">
                                    {positions.map(pos => (
                                        <label key={pos} className="flex items-center justify-between gap-3 text-gray-700 cursor-pointer select-none">
                                            {pos}
                                            <span className={`w-5 h-5 border rounded-sm flex items-center justify-center ${filters[pos] ? 'bg-[#167174] border-[#167174]' : 'border-gray-400'}`}>
                                                {filters[pos] && (
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </span>
                                            <input
                                                type="checkbox"
                                                checked={!!filters[pos]}
                                                onChange={() => handleCheckboxChange(pos as BooleanFilterKey)}
                                                className="hidden"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center text-gray-700 gap-2">
                                Trilhas
                                <div className="pl-8 max-h-12 overflow-y-auto">
                                    {tracks.map(track => (
                                        <label key={track} className="flex items-center justify-between gap-3 text-gray-700 cursor-pointer select-none">
                                            {track}
                                            <span className={`w-5 h-5 border rounded-sm flex items-center justify-center ${filters[track] ? 'bg-[#167174] border-[#167174]' : 'border-gray-400'}`}>
                                                {filters[track] && (
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </span>
                                            <input
                                                type="checkbox"
                                                checked={!!filters[track]}
                                                onChange={() => handleCheckboxChange(track as BooleanFilterKey)}
                                                className="hidden"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-gray-700">
                                <span>Ordem das notas</span>
                                <button
                                    type="button"
                                    onClick={toggleOrder}
                                    className="text-gray-700 hover:text-black cursor-pointer"
                                    title={filters.orderDesc ? 'Da maior para a menor' : 'Da menor para a maior'}
                                >
                                    <div className={`transition-transform duration-300 ${filters.orderDesc ? 'rotate-0' : 'rotate-180'}`}>
                                        <ArrowDownWideNarrow className="w-5 h-5" />
                                    </div>
                                </button>
                            </div>
                            <div className="flex flex-col text-gray-700">
                                <span>Intervalo de notas</span>
                                <div className="mt-3 px-2">
                                    <Slider
                                        getAriaLabel={() => 'Intervalo de nota'}
                                        value={filters.scoreRange}
                                        onChange={handleSliderChange}
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks={marks}
                                        min={0}
                                        max={5}
                                        sx={{
                                            color: '#2b5f60',
                                        }}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export type { Filters };
