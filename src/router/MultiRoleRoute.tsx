// src/router/MultiRoleRoute.tsx
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRoleEnum } from '../types/auth';

interface MultiRoleRouteProps {
    allowedRoles: UserRoleEnum[];
    redirectTo?: string;
    children: ReactNode;
}

/**
 * Componente para proteger rotas com múltiplos roles permitidos
 * Similar ao RoleRoute, mas mais explícito sobre permitir múltiplos roles
 */
export function MultiRoleRoute({
    allowedRoles,
    redirectTo = '/dashboard',
    children,
}: MultiRoleRouteProps) {
    const { user, hasAnyRole } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    return hasAnyRole(allowedRoles) ? (
        <>{children}</>
    ) : (
        <Navigate to={redirectTo} replace />
    );
}
