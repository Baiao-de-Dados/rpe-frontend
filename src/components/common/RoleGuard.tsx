// src/components/common/RoleGuard.tsx
import type { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserRoleEnum } from '../../types/auth';

interface RoleGuardProps {
    children: ReactNode;

    // Verificação por role específico
    role?: UserRoleEnum;

    // Verificação por qualquer um dos roles
    anyRole?: UserRoleEnum[];

    // Verificação por hierarquia mínima
    minimumRole?: UserRoleEnum;

    // ❌ REMOVIDO: feature?: Feature;

    // Fallback quando não tem acesso
    fallback?: ReactNode;
}

/**
 * Componente para controle de acesso baseado em roles
 *
 * Exemplos de uso:
 *
 * <RoleGuard role={UserRoleEnum.ADMIN}>
 *   <AdminPanel />
 * </RoleGuard>
 *
 * <RoleGuard anyRole={[UserRoleEnum.RH, UserRoleEnum.MANAGER]}>
 *   <EmployeeList />
 * </RoleGuard>
 *
 * <RoleGuard minimumRole={UserRoleEnum.LEADER}>
 *   <TeamManagement />
 * </RoleGuard>
 */
export function RoleGuard({
    children,
    role,
    anyRole,
    minimumRole,
    // ❌ REMOVIDO: feature,
    fallback = null,
}: RoleGuardProps) {
    const { hasRole, hasAnyRole, hasMinimumRole } = useAuth(); // ❌ REMOVIDO: hasFeature

    // Verificação por role específico
    if (role && !hasRole(role)) {
        return <>{fallback}</>;
    }

    // Verificação por qualquer um dos roles
    if (anyRole && !hasAnyRole(anyRole)) {
        return <>{fallback}</>;
    }

    // Verificação por hierarquia mínima
    if (minimumRole && !hasMinimumRole(minimumRole)) {
        return <>{fallback}</>;
    }

    // ❌ REMOVIDO: Verificação por feature

    return <>{children}</>;
}
