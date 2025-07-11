import { useAuth } from '../../hooks/useAuth';

import { UserRoleEnum } from '../../types/auth';

import { RHDashboard } from './RHDashboard';
import { AdminDashboard } from './AdminDashboard';
import { ManagerDashboard } from './ManagerDashboard';
import { CommitteeDashboard } from './CommitteeDashboard';
import { CollaboratorDashboard } from './CollaboratorDashboard';

export function Dashboard() {

    const { hasRole } = useAuth();

    // Admin Dashboard
    if (hasRole(UserRoleEnum.ADMIN)) {
        return <AdminDashboard />;
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

    // Colaborador Dashboard (padrão para todos os outros)
    return <CollaboratorDashboard />;

}
