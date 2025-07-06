import { Plus } from 'lucide-react';

import { useCycle } from '../../../hooks/useCycle';

export function AddPillarButton() {
    const { currentCycle } = useCycle();
    const isCycleOpen = currentCycle?.isOpen;

    return (
        <button className="bg-white rounded-xl shadow p-6 sm:p-8 min-w-[90vw] max-w-xs sm:min-w-[260px] sm:max-w-none min-h-[110px] sm:min-h-[140px] flex flex-col items-center justify-center border-2 border-dashed border-primary-400 text-primary-500 hover:bg-primary-50 hover:border-primary-500 transition-all duration-200 focus:outline-none hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" type="button" disabled={isCycleOpen} title={isCycleOpen ? 'Não é possível adicionar pilares porque o ciclo está aberto' : undefined}>
            <span className="text-2xl font-bold mb-2">
                <Plus />
            </span>
            <span className="font-medium text-base sm:text-lg">Adicionar novo pilar</span>
        </button>
    );
}
