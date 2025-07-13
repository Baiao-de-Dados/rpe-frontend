import { mockERP } from '../../data/mockAdmin';

import Button from '../../components/common/Button';
import PageHeader from '../../components/common/PageHeader';
import { ERPViewer } from '../../components/Dashboard/ERPViewer';
import { AdminMetrics } from '../../components/Dashboard/AdminMetrics';

export function AdminDashboard() {

    return (
        <>
            <PageHeader title='Painel do Administrador' 
                button={
                    <Button>
                        Sincronizar com ERP
                    </Button>
                } 
            />
            <main className="p-8 pt-6">
                <div className="mb-6">
                    <AdminMetrics
                        importedUsers={20}
                        importedProjects={6} 
                        lastSyncDate={'2023-10-01T12:00:00'}
                    />
                </div>
                <ERPViewer users={mockERP.users} projects={mockERP.projects} />
            </main>
        </>
    );
}
