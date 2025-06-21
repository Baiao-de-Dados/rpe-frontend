import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { ToastContext } from './ToastContextDefinition';
import type { ToastData, ToastContextType } from './ToastContextDefinition';

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [toast, setToast] = useState<ToastData | null>(null);

    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type, show: true });

        setTimeout(() => {
            setToast(prev => (prev ? { ...prev, show: false } : null));
        }, 5000);
    };

    const hideToast = () => {
        setToast(prev => (prev ? { ...prev, show: false } : null));
    };

    const value: ToastContextType = {
        toast,
        showToast,
        hideToast,
    };

    return (
        <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
    );
};
