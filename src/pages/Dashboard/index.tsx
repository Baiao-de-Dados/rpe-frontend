// src/pages/Dashboard/index.tsx
import { useAuth } from '../../hooks/useAuth';
import { UserRoleEnum } from '../../types/auth';
import { CollaboratorDashboard } from './CollaboratorDashboard';
import { RHDashboard } from './RHDashboard';
import { CommitteeDashboard } from './CommitteeDashboard';

export function Dashboard() {
    const { hasRole } = useAuth();

    // Committee Dashboard
    if (hasRole(UserRoleEnum.RH)) {
        return <CommitteeDashboard />;
    }

    // RH Dashboard
    if (hasRole(UserRoleEnum.COMMITTEE)) {
        return <RHDashboard />;
    }

    // Colaborador Dashboard (padrão para todos os outros)
    return <CollaboratorDashboard />;
}
