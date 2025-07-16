import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CycleBanner } from '../../components/Dashboard/CycleBanner';
import { CycleCard } from '../../components/common/CycleCard';
import { PerformanceChart } from '../../components/Charts/PerformanceChart';
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader';
import Typography from '../../components/common/Typography';
import CardContainer from '../../components/common/CardContainer';
import Button from '../../components/common/Button';
import { useCycleGradesQuery } from '../../hooks/api/useCollaboratorQuery';
import CycleLoading from '../../components/common/CycleLoading';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import { useCycle } from '../../hooks/useCycle';

export function CollaboratorDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { data: cyclesGrades, isLoading } = useCycleGradesQuery();
    const { currentCycle, isLoading: isLoadingCycle } = useCycle(); // Mantido para uso futuro

    // Adapta os dados da API para os componentes
    const cycles = cyclesGrades?.cycles || [];
    const cycleCards = cycles.map(cycle => ({
        cycleName: `Ciclo ${cycle.cycleName}`,
        score: cycle.finalEvaluation ?? 0,
        status: cycle.finalEvaluation !== null && cycle.finalEvaluation !== undefined ? 'Finalizado' : 'Em andamento',
        summary: '',
    }));

    const chartData = cycles
        .filter(cycle => cycle.finalEvaluation !== null && cycle.finalEvaluation !== undefined)
        .map(cycle => ({
            cycleName: cycle.cycleName,
            finalScore: cycle.finalEvaluation ?? 0,
            selfEvalScore: cycle.finalEvaluation ?? 0,
        }));

    if (isLoading || isLoadingCycle) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    return (
        <>
            <DashboardHeader userName={user?.name || 'Usuário Teste'} />
            <main className='p-8 pt-6'>
                <div className="mb-4">
                    <CycleBanner linkTo="/avaliacao" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <section className="lg:col-span-5 xl:col-span-4">
                        <CardContainer>
                            <div className="flex items-center justify-between mb-6">
                                <Typography variant="h2" color="primary" className="font-bold text-lg sm:text-xl">
                                    Suas avaliações
                                </Typography>
                                <Button variant="link" size="sm" onClick={() => navigate('/avaliacao')}>
                                    Ver mais
                                </Button>
                            </div>

                            <div className="h-[400px] sm:h-[500px] overflow-y-auto pr-2">
                                {cycleCards.length === 0 ? (
                                    <div className="flex items-center justify-center h-full text-neutral-500">
                                        <Typography variant="body" color="muted">
                                            Nenhuma avaliação encontrada
                                        </Typography>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {cycleCards.map(cycle => (
                                            <CycleCard
                                                key={cycle.cycleName}
                                                score={cycle.score}
                                                status={cycle.status as 'Finalizado' | 'Em andamento'}
                                                cycleName={cycle.cycleName}
                                                summary={cycle.summary}
                                                onClick={() => navigate('/avaliacao')}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContainer>
                    </section>

                    <section className="lg:col-span-7 xl:col-span-8">
                        <CardContainer>
                            <div className="mb-6">
                                <Typography variant="h2" color="primary" className="font-bold text-lg sm:text-xl">
                                    Desempenho
                                </Typography>
                            </div>

                            <div className="h-[400px] sm:h-[500px]">
                                <PerformanceChart cycles={chartData} />
                            </div>
                        </CardContainer>
                    </section>
                </div>
            </main>
        </>
    );
}
