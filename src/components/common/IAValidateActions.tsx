import Typography from './Typography';

import { Check, Sparkles, X } from 'lucide-react';

interface IAValidateActionsProps {
    onCheck: () => void;
    onError: () => void;
}

const IAValidateActions = ({ onCheck, onError }: IAValidateActionsProps) => {

    return (
        <div className="flex flex-col items-center w-full p-4 mb-6 bg-[var(--color-neutral-100)] rounded gap-3 sm:flex-row sm:justify-between sm:gap-0">
            <div className='flex flex-col items-center gap-2 sm:flex-row sm:text-left'>
                <Sparkles className="text-primary-500 flex-shrink-0" size={24} fill="currentColor" />
                <Typography variant="body" color='primary500' className="text-sm sm:text-base text-center sm:text-left">
                    Esta avaliação foi gerada automaticamente pela IA. Por favor, revise e confirme sua escolha.
                </Typography>
            </div>
            <div className="flex gap-2 w-full sm:w-auto sm:flex-shrink-0">
                <button onClick={onCheck} title='Aceitar' className="flex-1 sm:flex-none p-3 sm:p-2 bg-[var(--color-check-color)] hover:bg-[var(--color-check-color-hover)] text-white rounded cursor-pointer flex items-center justify-center">
                    <Check size={20} />
                </button>
                <button onClick={onError} title='Cancelar' className="flex-1 sm:flex-none p-3 sm:p-2 bg-[var(--color-error-500)] hover:bg-[var(--color-error-600)] text-white rounded cursor-pointer flex items-center justify-center">
                    <X size={20} />
                </button>
            </div>
        </div>
    );

};

export default IAValidateActions;
