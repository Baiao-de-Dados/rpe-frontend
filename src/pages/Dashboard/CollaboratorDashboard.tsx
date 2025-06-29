import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CycleBanner } from '../../components/Dashboard/CycleBanner';
import { CycleCard } from '../../components/common/CycleCard';
import { PerformanceChart } from '../../components/Charts/PerformanceChart';
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader';
import Typography from '../../components/common/Typography';
import CardContainer from '../../components/common/CardContainer';
import Button from '../../components/common/Button';
import { RoleGuard } from '../../components/common/RoleGuard';
import { UserRoleEnum } from '../../types/auth';
import { mockCycles } from '../../data/mockCycles';

// Filtrando os dados para o gráfico de desempenho (apenas ciclos finalizados) - remover isso dps com o back
const chartData = mockCycles
    .filter(cycle => cycle.status === 'Finalizado')
    .map(({ cycleName, score }) => ({ cycleName, score }));

// Mapeamento de status do mockCycles para o CycleBanner - remover isso dps com o back
const mapStatusToCycleBanner = (
    status: string,
): 'open' | 'closed' | 'upcoming' => {
    switch (status) {
        case 'Em andamento':
            return 'open';
        case 'Finalizado':
            return 'closed';
        case 'Pendente':
        default:
            return 'upcoming';
    }
};

export function CollaboratorDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Encontrar o ciclo atual (assumindo que é o primeiro na lista, que geralmente é o mais recente)
    const currentCycle = mockCycles[1];
    // Calcular dias restantes (exemplo: no mundo real, isso viria do backend)
    const remainingDays = currentCycle.status === 'Em andamento' ? 15 : 0;

    return (
        <div className="min-h-screen bg-neutral-100">
            {/* Header */}
            <DashboardHeader userName={user?.name || 'Usuário Teste'} />

            <div className="py-4 px-3 sm:px-5">
                <div className="px-4 sm:px-8 pb-4 mb-4">
                    <CycleBanner
                        status={mapStatusToCycleBanner(currentCycle.status)}
                        cycleName={`Ciclo ${currentCycle.cycleName}`}
                        remainingDays={remainingDays}
                        linkTo="/avaliacao"
                    />
                </div>

                {/* Layout principal */}
                <main className="px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Coluna da esquerda - Avaliações */}
                    <section className="lg:col-span-5 xl:col-span-4">
                        <CardContainer>
                            {/* Cabeçalho da seção */}
                            <div className="flex items-center justify-between mb-6">
                                <Typography
                                    variant="h2"
                                    color="primary"
                                    className="font-bold text-lg sm:text-xl"
                                >
                                    Suas avaliações
                                </Typography>

                                {/* 🎯 Botões condicionais baseados em role */}
                                <RoleGuard
                                    anyRole={[
                                        UserRoleEnum.MANAGER,
                                        UserRoleEnum.COMMITTEE,
                                        UserRoleEnum.ADMIN,
                                        UserRoleEnum.DEVELOPER,
                                    ]}
                                >
                                    <Button
                                        variant="link"
                                        size="sm"
                                        onClick={() => navigate('/evolucao')}
                                    >
                                        Ver Evolução Completa
                                    </Button>
                                </RoleGuard>

                                <RoleGuard
                                    anyRole={[
                                        UserRoleEnum.EMPLOYER,
                                        UserRoleEnum.MENTOR,
                                        UserRoleEnum.LEADER,
                                        UserRoleEnum.RH,
                                    ]}
                                >
                                    <Button
                                        variant="link"
                                        size="sm"
                                        onClick={() =>
                                            alert(
                                                'Relatórios de evolução disponíveis apenas para MANAGER ou superior',
                                            )
                                        }
                                    >
                                        Ver Resumo
                                    </Button>
                                </RoleGuard>
                            </div>

                            {/* Container com altura fixa e scrollbar */}
                            <div className="h-[400px] sm:h-[500px] overflow-y-auto pr-2">
                                <div className="space-y-4">
                                    {mockCycles.map(cycle => (
                                        <CycleCard
                                            key={cycle.cycleName}
                                            score={cycle.score}
                                            status={
                                                cycle.status as
                                                    | 'Finalizado'
                                                    | 'Em andamento'
                                                    | 'Pendente'
                                            }
                                            cycleName={`Ciclo ${cycle.cycleName}`}
                                            summary={cycle.summary}
                                            onClick={() =>
                                                navigate('/avaliacao')
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        </CardContainer>
                    </section>

                    {/* Coluna da direita - Desempenho */}
                    <section className="lg:col-span-7 xl:col-span-8">
                        <CardContainer>
                            {/* Cabeçalho da seção - o filtro está dentro do componente PerformanceChart */}
                            <div className="mb-6">
                                <Typography
                                    variant="h2"
                                    color="primary"
                                    className="font-bold text-lg sm:text-xl"
                                >
                                    Desempenho
                                </Typography>
                            </div>

                            {/* Container com altura fixa para o gráfico */}
                            <div className="h-[400px] sm:h-[500px]">
                                <PerformanceChart cycles={chartData} />
                            </div>
                        </CardContainer>
                    </section>
                </main>
            </div>
        </div>
    );
}
