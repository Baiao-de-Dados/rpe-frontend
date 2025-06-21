import { createContext } from 'react';

export interface ToastData {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    show: boolean;
    duration?: number; // em ms, undefined = persistente
    title?: string;
}

export interface ToastContextType {
    toasts: ToastData[];
    showToast: (
        message: string,
        type: 'success' | 'error' | 'info' | 'warning',
        options?: {
            duration?: number;
            title?: string;
        },
    ) => string; // retorna o ID do toast
    hideToast: (id: string) => void;
    clearAllToasts: () => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
    undefined,
);
