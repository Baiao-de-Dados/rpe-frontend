import { useAuth } from '../../hooks/useAuth';

import { UserRoleEnum } from '../../types/auth';
import { CollaboratorDashboard } from './CollaboratorDashboard';
import { LeaderDashboard } from './LeaderDashboard';
import { AdminDashboard } from './AdminDashboard';
import { ManagerDashboard } from './ManagerDashboard';
import { CommitteeDashboard } from './CommitteeDashboard';
import { RHDashboard } from './RHDashboard';

export function Dashboard() {

    const { hasRole } = useAuth();

    // RH Dashboard (prioridade alta)
    if (hasRole(UserRoleEnum.RH)) {
        return <RHDashboard />; 
    }

    // Leader Dashboard
    if (hasRole(UserRoleEnum.LEADER)) {
        return <LeaderDashboard />;
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
