import { useState } from 'react';
import { Filter, X, ArrowDownWideNarrow } from 'lucide-react';
import Slider from '@mui/material/Slider';

interface Filters {
  pendentes: boolean;
  finalizados: boolean;
  maiorParaMenor: boolean;
  menorParaMaior: boolean;
  notaRange: [number, number];
  [key: string]: boolean | [number, number];
}

type BooleanFilterKey = Exclude<keyof Filters, 'notaRange'>;

interface AdvancedFiltersProps {
  className?: string;
  cargos?: string[];
  trilhas?: string[];
  onApply: (filters: Filters) => void;
}

function createInitialFilters(cargos: string[] = [], trilhas: string[] = []): Filters {
  return {
    pendentes: true,
    finalizados: true,
    maiorParaMenor: true,
    menorParaMaior: false,
    notaRange: [0, 5],
    ...Object.fromEntries(cargos.map(cargo => [cargo, true])),
    ...Object.fromEntries(trilhas.map(trilha => [trilha, true])),
  };
}

export default function AdvancedFilter({ className, cargos = [], trilhas = [], onApply }: AdvancedFiltersProps) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(() => createInitialFilters(cargos, trilhas));

  const marks = Array.from({ length: 6 }, (_, i) => ({
    value: i,
    label: `${i}`,
  }));

  const handleCheckboxChange = (name: BooleanFilterKey) => {
    setFilters(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setFilters(prev => ({ ...prev, notaRange: newValue as [number, number] }));
    }
  };

  const toggleOrder = () => {
    setFilters(prev => ({
      ...prev,
      maiorParaMenor: !prev.maiorParaMenor,
      menorParaMaior: prev.maiorParaMenor,
    }));
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
              {/* Pendentes */}
              <label className="flex items-center justify-between gap-3 text-gray-700 cursor-pointer select-none">
                Pendentes
                <span className={`w-5 h-5 border rounded-sm flex items-center justify-center ${filters.pendentes ? 'bg-[#167174] border-[#167174]' : 'border-gray-400'}`}>
                  {filters.pendentes && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <input type="checkbox" checked={filters.pendentes} onChange={() => handleCheckboxChange('pendentes')} className="hidden" />
              </label>

              {/* Finalizados */}
              <label className="flex items-center justify-between gap-3 text-gray-700 cursor-pointer select-none">
                Finalizados
                <span className={`w-5 h-5 border rounded-sm flex items-center justify-center ${filters.finalizados ? 'bg-[#167174] border-[#167174]' : 'border-gray-400'}`}>
                  {filters.finalizados && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <input type="checkbox" checked={filters.finalizados} onChange={() => handleCheckboxChange('finalizados')} className="hidden" />
              </label>

              {/* Cargos */}
              <div className="flex flex-col justify-center text-gray-700 gap-2">
                Cargos
                <div className="pl-8 max-h-12 overflow-y-auto">
                  {cargos.map(cargo => (
                    <label key={cargo} className="flex items-center justify-between gap-3 text-gray-700 cursor-pointer select-none">
                      {cargo}
                      <span className={`w-5 h-5 border rounded-sm flex items-center justify-center ${filters[cargo] ? 'bg-[#167174] border-[#167174]' : 'border-gray-400'}`}>
                        {filters[cargo] && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        checked={!!filters[cargo]}
                        onChange={() => handleCheckboxChange(cargo as BooleanFilterKey)}
                        className="hidden"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Trilhas */}
                <div className="flex flex-col justify-center text-gray-700 gap-2">
                  Trilhas
                  <div className="pl-8 max-h-12 overflow-y-auto">
                    {trilhas.map(trilha => (
                      <label key={trilha} className="flex items-center justify-between gap-3 text-gray-700 cursor-pointer select-none">
                        {trilha}
                        <span className={`w-5 h-5 border rounded-sm flex items-center justify-center ${filters[trilha] ? 'bg-[#167174] border-[#167174]' : 'border-gray-400'}`}>
                          {filters[trilha] && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        <input
                          type="checkbox"
                          checked={!!filters[trilha]}
                          onChange={() => handleCheckboxChange(trilha as BooleanFilterKey)}
                          className="hidden"
                        />
                      </label>
                    ))}
                  </div>
                </div>


              {/* Ordem das notas */}
              <div className="flex items-center justify-between text-gray-700">
                <span>Ordem das notas</span>
                <button
                  type="button"
                  onClick={toggleOrder}
                  className="text-gray-700 hover:text-black cursor-pointer"
                  title={filters.maiorParaMenor ? 'Da maior para a menor' : 'Da menor para a maior'}
                >
                  <div className={`transition-transform duration-300 ${filters.maiorParaMenor ? 'rotate-0' : 'rotate-180'}`}>
                    <ArrowDownWideNarrow className="w-5 h-5" />
                  </div>
                </button>
              </div>

              {/* Slider de notas */}
              <div className="flex flex-col text-gray-700">
                <span>Intervalo de notas</span>
                <div className="mt-3 px-2">
                  <Slider
                    getAriaLabel={() => 'Intervalo de nota'}
                    value={filters.notaRange}
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

              {/* Botão aplicar */}
              <button
                type="button"
                onClick={() => {
                  onApply(filters);
                  setOpen(false);
                }}
                className="mt-4 bg-[#167174] hover:bg-[#125c5e] text-white font-semibold py-2 px-4 rounded-md transition-colors cursor-pointer"
              >
                Aplicar Filtro
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export type { Filters };
