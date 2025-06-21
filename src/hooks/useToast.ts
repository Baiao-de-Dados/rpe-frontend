import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastContextDefinition';
import type { ToastContextType } from '../contexts/ToastContextDefinition';

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast deve ser usado dentro de um ToastProvider');
    }
    return context;
};
