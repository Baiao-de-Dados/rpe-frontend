import { useState, useCallback } from 'react';

export interface NotificationState {
    id: string;
    active: boolean;
    count?: number;
    type?: 'error' | 'warning' | 'info' | 'success';
}

export function useNotifications(
    initialNotifications: NotificationState[] = [],
) {
    const [notifications, setNotifications] =
        useState<NotificationState[]>(initialNotifications);

    // Funções simples - useCallback removido onde desnecessário
    const addNotification = (
        notification: Omit<NotificationState, 'active'>,
    ) => {
        setNotifications(prev => [
            ...prev.filter(n => n.id !== notification.id),
            { ...notification, active: true },
        ]);
    };

    const removeNotification = (id: string) => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, active: false } : n)),
        );
    };

    const toggleNotification = (id: string) => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, active: !n.active } : n)),
        );
    };

    // Mantém useCallback apenas para funções que são frequentemente passadas como props
    const updateNotificationCount = useCallback((id: string, count: number) => {
        setNotifications(prev =>
            prev.map(n =>
                n.id === id ? { ...n, count, active: count > 0 } : n,
            ),
        );
    }, []);

    const updateNotificationState = useCallback(
        (id: string, updates: Partial<NotificationState>) => {
            setNotifications(prev =>
                prev.map(n => (n.id === id ? { ...n, ...updates } : n)),
            );
        },
        [],
    );

    const clearAllNotifications = () => {
        setNotifications(prev => prev.map(n => ({ ...n, active: false })));
    };

    // Função simples - não precisa de useCallback
    const getNotification = (id: string) => {
        return notifications.find(n => n.id === id);
    };

    // Cálculos simples - removido useMemo desnecessário
    const hasActiveNotifications = notifications.some(n => n.active);
    const activeNotificationsCount = notifications.filter(n => n.active).length;

    return {
        notifications,
        addNotification,
        removeNotification,
        toggleNotification,
        updateNotificationCount,
        updateNotificationState,
        clearAllNotifications,
        getNotification,
        hasActiveNotifications,
        activeNotificationsCount,
    };
}
