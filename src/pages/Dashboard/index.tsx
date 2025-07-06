// src/pages/Dashboard/index.tsx
import { useAuth } from '../../hooks/useAuth';
import { UserRoleEnum } from '../../types/auth';
import { CollaboratorDashboard } from './CollaboratorDashboard';
import { RHDashboard } from './RHDashboard';

export function Dashboard() {
    const { hasRole } = useAuth();

    // RH Dashboard
    if (hasRole(UserRoleEnum.RH)) {
        return <RHDashboard />;
    }

    // Colaborador Dashboard (padrão para todos os outros)
    return <CollaboratorDashboard />;
}
