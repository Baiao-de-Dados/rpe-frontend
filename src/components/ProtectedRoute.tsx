// src/components/ProtectedRoute.tsx
import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRoleEnum } from '../types/auth';
import { hasRequiredRole } from '../utils/roleUtils';

export function ProtectedRoute() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

interface RoleRouteProps {
    requiredRole: UserRoleEnum;
    redirectTo?: string;
    children: ReactNode;
}

export function RoleRoute({
    requiredRole,
    redirectTo = '/dashboard',
    children,
}: RoleRouteProps) {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    if (hasRequiredRole(user.roles, requiredRole)) {
        return <>{children}</>;
    }

    return <Navigate to={redirectTo} replace />;
}
