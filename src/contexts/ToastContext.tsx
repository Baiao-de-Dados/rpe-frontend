import React, { useState, useRef } from 'react';
import type { ReactNode } from 'react';
import { ToastContext } from './ToastContextDefinition';
import type { ToastData, ToastContextType } from './ToastContextDefinition';

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
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
        const duration = options?.duration ?? 5000; // 5s padrão

        const newToast: ToastData = {
            id,
            message,
            type,
            show: true,
            duration: duration > 0 ? duration : undefined, // 0 ou negativo = persistente
            title: options?.title,
        };

        setToasts(prev => [...prev, newToast]);

        // Auto-hide apenas se duration foi definida
        if (newToast.duration) {
            const timer = setTimeout(() => {
                hideToast(id);
            }, newToast.duration);

            timersRef.current.set(id, timer);
        }

        return id;
    };

    const hideToast = (id: string) => {
        // Limpa o timer se existir
        const timer = timersRef.current.get(id);
        if (timer) {
            clearTimeout(timer);
            timersRef.current.delete(id);
        }

        // Marca o toast como hidden (para animação)
        setToasts(prev =>
            prev.map(toast =>
                toast.id === id ? { ...toast, show: false } : toast,
            ),
        );

        // Remove o toast após a animação (300ms)
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 300);
    };

    const clearAllToasts = () => {
        // Limpa todos os timers
        timersRef.current.forEach(timer => clearTimeout(timer));
        timersRef.current.clear();

        // Esconde todos os toasts
        setToasts(prev => prev.map(toast => ({ ...toast, show: false })));

        // Remove todos após animação
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
