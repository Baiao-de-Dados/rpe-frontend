import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CycleBanner } from '../../components/Dashboard/CycleBanner';
import { CycleCard } from '../../components/common/CycleCard';
import { PerformanceChart } from '../../components/Charts/PerformanceChart';
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader';
import Typography from '../../components/common/Typography';
import CardContainer from '../../components/common/CardContainer';
import Button from '../../components/common/Button';
import { mockCycles } from '../../data/mockCycles';
import CycleLoading from '../../components/common/CycleLoading';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import { useCycle } from '../../hooks/useCycle';
import { getRemainingDays } from '../../utils/globalUtils';

const chartData = mockCycles
    .filter(cycle => cycle.status === 'Finalizado')
    .map(({ cycleName, score }) => ({ cycleName, score }));

export function CollaboratorDashboard() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const { currentCycle, isLoading } = useCycle();

    if (isLoading) {
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
                    <CycleBanner
                        cycleStatus={{isActive: currentCycle.isActive, done: currentCycle.done}}
                        cycleName={`Ciclo ${currentCycle.name}`}
                        remainingDays={getRemainingDays({ startDate: currentCycle.startDate, endDate: currentCycle.endDate })}
                        linkTo="/avaliacao"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <section className="lg:col-span-5 xl:col-span-4">
                        <CardContainer>
                            <div className="flex items-center justify-between mb-6">
                                <Typography variant="h2" color="primary" className="font-bold text-lg sm:text-xl">
                                    Suas avaliações
                                </Typography>
                                    <Button variant="link" size="sm" onClick={() => navigate('/evolucao')}>
                                        Ver mais
                                    </Button>
                            </div>

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
