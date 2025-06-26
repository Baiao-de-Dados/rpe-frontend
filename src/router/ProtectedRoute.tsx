// src/router/ProtectedRoute.tsx
import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRoleEnum } from '../types/auth';

export function ProtectedRoute() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

interface RoleRouteProps {
    requiredRoles: UserRoleEnum[];
    redirectTo?: string;
    children: ReactNode;
}

/**
 * Componente para proteger rotas baseado em roles
 * Verifica se o usuário tem pelo menos um dos roles necessários
 */
export function RoleRoute({
    requiredRoles,
    redirectTo = '/dashboard',
    children,
}: RoleRouteProps) {
    const { user, hasAnyRole } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    if (hasAnyRole(requiredRoles)) {
        return <>{children}</>;
    }

    return <Navigate to={redirectTo} replace />;
}

interface HierarchyRouteProps {
    minimumRole: UserRoleEnum;
    redirectTo?: string;
    children: ReactNode;
}

/**
 * Componente para proteger rotas baseado em HIERARQUIA
 * Verifica se o usuário tem pelo menos o nível mínimo
 * ADMIN pode acessar tudo que MANAGER pode, etc.
 *
 * Exemplo:
 * <HierarchyRoute minimumRole={UserRoleEnum.MANAGER}>
 *   <Evolucao />  // MANAGER, RH, COMMITTEE, ADMIN, DEVELOPER podem acessar
 * </HierarchyRoute>
 */
export function HierarchyRoute({
    minimumRole,
    redirectTo = '/dashboard',
    children,
}: HierarchyRouteProps) {
    const { user, hasMinimumRole } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    if (hasMinimumRole(minimumRole)) {
        return <>{children}</>;
    }

    return <Navigate to={redirectTo} replace />;
}
