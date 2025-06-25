// src/components/MultiRoleRoute.tsx
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRoleEnum } from '../types/auth';
import { hasAnyRole } from '../utils/roleUtils';

interface MultiRoleRouteProps {
    allowedRoles: UserRoleEnum[];
    redirectTo?: string;
    children: ReactNode;
}

export function MultiRoleRoute({
    allowedRoles,
    redirectTo = '/dashboard',
    children,
}: MultiRoleRouteProps) {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    const hasAccess = hasAnyRole(user.roles, allowedRoles);

    return hasAccess ? <>{children}</> : <Navigate to={redirectTo} replace />;
}
