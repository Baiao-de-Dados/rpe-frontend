// src/components/ProtectedRoute.tsx
import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRoleEnum } from '../types/auth';
import { hasAnyRole } from '../utils/roleUtils';

export function ProtectedRoute() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

interface RoleRouteProps {
    requiredRoles: UserRoleEnum[];
    redirectTo?: string;
    children: ReactNode;
}

export function RoleRoute({
    requiredRoles,
    redirectTo = '/dashboard',
    children,
}: RoleRouteProps) {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    if (hasAnyRole(user.roles, requiredRoles)) {
        return <>{children}</>;
    }

    return <Navigate to={redirectTo} replace />;
}
