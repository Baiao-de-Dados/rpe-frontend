// src/pages/Dashboard/index.tsx
import { useAuth } from '../../hooks/useAuth';
import { UserRoleEnum } from '../../types/auth';
import { CollaboratorDashboard } from './CollaboratorDashboard';
import { LeaderDashboard } from './LeaderDashboard';
import { RHDashboard } from './RHDashboard';
import { CommitteeDashboard } from './CommitteeDashboard';
import { ManagerDashboard } from './ManagerDashboard';

export function Dashboard() {

    const { hasRole } = useAuth();

    // Leader Dashboard
    if (hasRole(UserRoleEnum.LEADER)) {
        return <LeaderDashboard />;
    }

    // RH Dashboard
    if (hasRole(UserRoleEnum.COMMITTEE)) {
        return <RHDashboard />;
    }

    // Committee Dashboard
    if (hasRole(UserRoleEnum.COMMITTEE)) {
        return <CommitteeDashboard />;
    }

    // Manager Dashboard
    if (hasRole(UserRoleEnum.RH)) {
        return <ManagerDashboard />;
    }

    // Colaborador Dashboard (padrão para todos os outros)
    return <CollaboratorDashboard />;

}
