// src/pages/Dashboard/RHDashboard.tsx
import { useAuth } from '../../hooks/useAuth';
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader';
import { RHMetrics } from '../../components/Dashboard/RHMetrics';
import { RHPerformanceChart } from '../../components/Charts/RHPerformanceChart';
import { RHCollaboratorList } from '../../components/Dashboard/RHCollaboratorList';
import Typography from '../../components/common/Typography';
import CardContainer from '../../components/common/CardContainer';
import {
    mockRHMetrics,
    mockTrackData,
    mockRHCollaborators,
} from '../../data/mockRHData';

export function RHDashboard() {
    const { user } = useAuth();

    return (
        <>
            {/* Header reutilizado */}
            <DashboardHeader userName={user?.name || 'Gestor RH'} />

            <main className="p-8 pt-6">
                {/* Métricas principais do RH */}
                <div className="mb-6">
                    <RHMetrics
                        totalCollaborators={mockRHMetrics.totalCollaborators}
                        completedEvaluations={
                            mockRHMetrics.completedEvaluations
                        }
                        pendingEvaluations={mockRHMetrics.pendingEvaluations}
                        completionPercentage={
                            mockRHMetrics.completionPercentage
                        }
                    />
                </div>

                {/* Layout principal */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Coluna da esquerda - Lista de Colaboradores */}
                    <section className="lg:col-span-5 xl:col-span-4 h-full flex flex-col min-h-[400px] max-h-[600px]">
                        <RHCollaboratorList
                            collaborators={mockRHCollaborators}
                        />
                    </section>

                    {/* Coluna da direita - Gráfico de Preenchimento por Setor */}
                    <section className="lg:col-span-7 xl:col-span-8 h-full flex flex-col min-h-[400px] max-h-[600px]">
                        <CardContainer className="flex flex-col h-full">
                            <div className="mb-6">
                                <Typography
                                    variant="h2"
                                    color="primary"
                                    className="font-bold text-lg sm:text-xl"
                                >
                                    Preenchimento
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="muted"
                                    className="mt-1"
                                >
                                    Trilhas
                                </Typography>
                            </div>
                            <div className="flex-1 flex items-center min-h-0">
                                <RHPerformanceChart data={mockTrackData} />
                            </div>
                        </CardContainer>
                    </section>
                </div>
            </main>
        </>
    );
}
