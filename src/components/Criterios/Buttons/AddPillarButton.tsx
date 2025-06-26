import { Plus } from 'lucide-react';

export function AddPillarButton() {
    return (
        <button
            className="bg-white rounded-xl shadow p-6 sm:p-8 min-w-[90vw] max-w-xs sm:min-w-[260px] sm:max-w-none min-h-[110px] sm:min-h-[140px] flex flex-col items-center justify-center border-2 border-dashed border-primary-400 text-primary-500 hover:bg-primary-50 hover:border-primary-500 transition-all duration-200 focus:outline-none hover:cursor-pointer"
            type="button"
        >
            <span className="text-2xl font-bold mb-2">
                <Plus />
            </span>
            <span className="font-medium text-base sm:text-lg">
                Adicionar novo pilar
            </span>
        </button>
    );
}
