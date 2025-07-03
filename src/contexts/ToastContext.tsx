import { useState, useRef, type ReactNode } from 'react';

import { ToastContext, type ToastData, type ToastContextType} from './ToastContextDefinition';

export const ToastProvider = ({ children }: { children: ReactNode }) => {

    const [toasts, setToasts] = useState<ToastData[]>([]);
    const timersRef = useRef<Map<string, number>>(new Map());

    const generateId = () => {
        return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    };

    const showToast = (
        message: string,
        type: 'success' | 'error' | 'info' | 'warning',
        options?: {
            duration?: number;
            title?: string;
        },
    ): string => {
        const id = generateId();
        const duration = options?.duration ?? 5000; 

        const newToast: ToastData = {
            id,
            message,
            type,
            show: true,
            duration: duration > 0 ? duration : undefined, // 0 ou negativo = persistente
            title: options?.title,
        };

        setToasts(prev => [...prev, newToast]);

        if (newToast.duration) {
            const timer = setTimeout(() => {
                hideToast(id);
            }, newToast.duration);

            timersRef.current.set(id, timer);
        }

        return id;
    };

    const hideToast = (id: string) => {
        const timer = timersRef.current.get(id);
        if (timer) {
            clearTimeout(timer);
            timersRef.current.delete(id);
        }

        setToasts(prev =>
            prev.map(toast =>
                toast.id === id ? { ...toast, show: false } : toast,
            ),
        );

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 300);
    };

    const clearAllToasts = () => {
        timersRef.current.forEach(timer => clearTimeout(timer));
        timersRef.current.clear();

        setToasts(prev => prev.map(toast => ({ ...toast, show: false })));

        setTimeout(() => {
            setToasts([]);
        }, 300);
    };

    const value: ToastContextType = {
        toasts,
        showToast,
        hideToast,
        clearAllToasts,
    };

    return (
        <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
    );
};
