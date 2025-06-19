import { useState, useCallback, useMemo } from 'react';

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

    const addNotification = useCallback(
        (notification: Omit<NotificationState, 'active'>) => {
            setNotifications(prev => [
                ...prev.filter(n => n.id !== notification.id),
                { ...notification, active: true },
            ]);
        },
        [],
    );

    const removeNotification = useCallback((id: string) => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, active: false } : n)),
        );
    }, []);

    const toggleNotification = useCallback((id: string) => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, active: !n.active } : n)),
        );
    }, []);

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

    const clearAllNotifications = useCallback(() => {
        setNotifications(prev => prev.map(n => ({ ...n, active: false })));
    }, []);

    const getNotification = useCallback(
        (id: string) => {
            return notifications.find(n => n.id === id);
        },
        [notifications],
    );

    const hasActiveNotifications = useMemo(() => {
        return notifications.some(n => n.active);
    }, [notifications]);

    const activeNotificationsCount = useMemo(() => {
        return notifications.filter(n => n.active).length;
    }, [notifications]);

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
