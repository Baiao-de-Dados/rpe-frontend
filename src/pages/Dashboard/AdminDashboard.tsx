import { Loader2 } from 'lucide-react';
import { useMemo, useEffect } from 'react';

import Button from '../../components/common/Button';
import PageHeader from '../../components/common/PageHeader';
import { ERPViewer } from '../../components/Dashboard/ERPViewer';
import { AdminMetrics } from '../../components/Dashboard/AdminMetrics';

import { useToast } from '../../hooks/useToast';
import { useERP, useSynchronizeERP } from '../../hooks/api/useAdminQuery';

export function AdminDashboard() {

    const { data: erp, isLoading, isError } = useERP();
    const { showToast } = useToast();
    const { mutate: synchronizeERP, isPending: isSyncing } = useSynchronizeERP();

    useEffect(() => {
        if (isError) {
            showToast('Erro ao carregar dados do ERP. Tente novamente mais tarde.', 'error', { title: 'Erro de carregamento' });
        }
    }, [isError, showToast]);

    const adaptedProjects = useMemo(() => {
        if (!erp?.projects) return [];
        return erp.projects.map((proj) => ({
            name: proj.name,
            manager: proj.projectMembers.find((m) => m.role === 'MANAGER') || { email: '', startDate: '', endDate: null },
            leaders: proj.projectMembers.filter((m) => m.role === 'LEADER').map(({ email, startDate, endDate }) => ({ email, startDate, endDate })),
            collaborators: proj.projectMembers.filter((m) => m.role === 'EMPLOYER').map(({ email, startDate, endDate }) => ({ email, startDate, endDate })),
        }));
    }, [erp?.projects]);

    const users = useMemo(() => {
        if (!erp?.projects) return [];
        const allMembers = erp.projects.flatMap((proj) => proj.projectMembers);
        const uniqueByEmail = new Map();
        allMembers.forEach((member) => {
            if (!uniqueByEmail.has(member.email)) {
                uniqueByEmail.set(member.email, {
                    name: member.name,
                    email: member.email,
                    position: member.position,
                    track: member.track,
                    primaryRole: member.role,
                });
            }
        });
        return Array.from(uniqueByEmail.values());
    }, [erp?.projects]);

    return (
        <>
            <PageHeader title='Painel do Administrador'
                button={
                    <Button onClick={() => synchronizeERP()} disabled={isSyncing}>
                        {isSyncing ? 'Sincronizando...' : 'Sincronizar com ERP'}
                    </Button>
                }
            />
            <main className="p-8 pt-6">
                {
                    isLoading ?
                        <div className="flex justify-center items-center py-8">
                            <Loader2 className="animate-spin h-8 w-8 text-primary-500" />
                        </div>
                        :
                        <>
                            <div className="mb-6">
                                <AdminMetrics
                                    importedUsers={users.length}
                                    importedProjects={erp?.projects?.length || 0}
                                    lastSyncDate={erp?.lastSyncDate || ''}
                                />
                            </div>
                            <ERPViewer users={users} projects={adaptedProjects} />
                        </>
                }
            </main>
        </>
    );
}
