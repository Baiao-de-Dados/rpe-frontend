import { useAuth } from '../../hooks/useAuth';

import { UserRoleEnum } from '../../types/auth';
import { CollaboratorDashboard } from './CollaboratorDashboard';
import { LeaderDashboard } from './LeaderDashboard';
import { RHDashboard } from './RHDashboard';
import { AdminDashboard } from './AdminDashboard';
import { ManagerDashboard } from './ManagerDashboard';
import { CommitteeDashboard } from './CommitteeDashboard';

export function Dashboard() {


    const { hasRole } = useAuth();

    // Leader Dashboard
    if (hasRole(UserRoleEnum.LEADER)) {
        return <LeaderDashboard />;
    }

    // RH Dashboard
    if (hasRole(UserRoleEnum.RH)) {
        return <RHDashboard />;
    }

    // Committee Dashboard
    if (hasRole(UserRoleEnum.COMMITTEE)) {
        return <CommitteeDashboard />;
    }

    // Manager Dashboard
    if (hasRole(UserRoleEnum.MANAGER)) {
        return <ManagerDashboard />;
    }

    if (hasRole(UserRoleEnum.ADMIN)) {
        return <AdminDashboard />;
    }

    // Colaborador Dashboard (padrão para todos os outros)
    return <CollaboratorDashboard />;


}
