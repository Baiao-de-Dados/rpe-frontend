import { createContext } from 'react';

export interface ToastData {
    message: string;
    type: 'success' | 'error' | 'info';
    show: boolean;
}

export interface ToastContextType {
    toast: ToastData | null;
    showToast: (message: string, type: 'success' | 'error' | 'info') => void;
    hideToast: () => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
    undefined,
);
